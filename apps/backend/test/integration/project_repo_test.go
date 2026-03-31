package integration

import (
	"context"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/domain/project"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func setupProjectRepo(t *testing.T) (*gorm.DB, project.Repository) {
	db := setupTestDB(t)
	assert.NoError(t, db.Exec("DELETE FROM projects;").Error)
	repo := project.NewRepo(db)
	err := db.Create(&models.User{BaseModel: models.BaseModel{ID: "user-1"}, Email: "test@email.com"}).Error
	assert.NoError(t, err)
	return db, repo
}

func cleanup(t *testing.T) {
	db := setupTestDB(t)
	db.Exec("DELETE FROM projects;")
	db.Exec("DELETE FROM users;")
}

func TestCreateProject(t *testing.T) {
	testProject := &models.Project{
		Name: "test",
	}

	tests := []struct {
		name        string
		userID      string
		input       *models.Project
		expectError bool
	}{
		{
			name:        "should create project successfully",
			userID:      "user-1",
			input:       testProject,
			expectError: false,
		},
		{
			name:        "should fail to create project with no userID",
			userID:      "",
			input:       testProject,
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var ctx context.Context
			db, repo := setupProjectRepo(t)
			defer cleanup(t)

			if tt.userID == "" {
				ctx = context.WithValue(context.Background(), project.UserIDKey{}, "")
			} else {
				ctx = context.WithValue(context.Background(), project.UserIDKey{}, tt.userID)
			}

			created, err := repo.Create(ctx, tt.input)

			if tt.expectError {
				assert.Error(t, err)
				assert.Nil(t, created)

				if tt.userID == "" {
					assert.ErrorIs(t, err, project.ErrNoUserID)
				}
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.input.Name, created.Name)

				var p models.Project
				err = db.First(&p, "id = ? AND user_id = ?", created.ID, created.UserID).Error

				assert.NoError(t, err)
				assert.Equal(t, tt.input.Name, p.Name)
			}
		})
	}
}

func TestListProjects(t *testing.T) {
	testProjects := []models.Project{
		{Name: "project 1", UserID: "user-1"},
		{Name: "project 2", UserID: "user-1"},
	}

	tests := []struct {
		name        string
		userID      string
		expectError bool
	}{
		{
			name:        "should list projects successfully",
			userID:      "user-1",
			expectError: false,
		},
		{
			name:        "should fail to list projects with no userID",
			userID:      "",
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var ctx context.Context

			_, repo := setupProjectRepo(t)
			defer cleanup(t)

			if tt.userID == "" {
				ctx = context.WithValue(context.Background(), project.UserIDKey{}, "")
			} else {
				ctx = context.WithValue(context.Background(), project.UserIDKey{}, "user-1")
			}

			if tt.expectError {
				projects, err := repo.List(ctx)
				assert.Error(t, err)
				assert.Nil(t, projects)
			} else {
				for _, tp := range testProjects {
					_, err := repo.Create(ctx, &tp)
					assert.NoError(t, err)
				}
				projects, err := repo.List(ctx)
				assert.NoError(t, err)
				assert.Len(t, *projects, len(testProjects))
			}
		})
	}
}
