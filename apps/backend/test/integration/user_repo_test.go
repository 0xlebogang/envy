package integration

import (
	"context"
	"errors"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/domain/user"
	"github.com/0xlebogang/envy/backend/internal/utils"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func setupUserRepo(t *testing.T) (*gorm.DB, user.Repository) {
	db := setupTestDB(t)
	assert.NoError(t, db.Exec("DELETE FROM users;").Error)
	repo := user.NewRepo(db)
	return db, repo
}

func TestCreateUser(t *testing.T) {
	db, repo := setupUserRepo(t)
	testUser := &models.User{
		Email: "test@email.com",
	}

	tests := []struct {
		name        string
		input       *models.User
		expectError bool
	}{
		{
			name:        "should create user successfully",
			input:       testUser,
			expectError: false,
		},
		{
			name:        "should return error on duplicate email",
			input:       testUser,
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctx := context.Background()

			created, err := repo.Create(ctx, tt.input)

			if tt.expectError {
				assert.Error(t, err)
				assert.True(t, errors.Is(err, gorm.ErrDuplicatedKey))
			} else {
				assert.NoError(t, err)
				assert.NotEqual(t, created.ID, "")
				assert.Equal(t, created.Email, tt.input.Email)

				var dbUser models.User
				assert.NoError(t, db.First(&dbUser, "id = ?", created.BaseModel.ID).Error)
			}
		})
	}
}

func TestGetByID(t *testing.T) {
	_, repo := setupUserRepo(t)
	ctx := context.Background()
	testUser := &models.User{
		BaseModel: models.BaseModel{
			ID: "user-1",
		},
		Email: "testuser@email.com",
	}

	_, _ = repo.Create(ctx, testUser)
	fetched, err := repo.GetByID(ctx, "user-1")
	assert.NoError(t, err)
	assert.Equal(t, fetched.Email, testUser.Email)
}

func TestGetByEmail(t *testing.T) {
	_, repo := setupUserRepo(t)
	ctx := context.Background()
	testUser := &models.User{
		BaseModel: models.BaseModel{
			ID: "user-1",
		},
		Email: "testuser@email.com",
	}

	_, _ = repo.Create(ctx, testUser)
	fetched, err := repo.GetByEmail(ctx, "testuser@email.com")
	assert.NoError(t, err)
	assert.Equal(t, fetched.Email, testUser.Email)
}

func TestList(t *testing.T) {
	db, repo := setupUserRepo(t)
	ctx := context.Background()
	testUsers := []models.User{
		{
			BaseModel: models.BaseModel{
				ID: "user-1",
			},
			Email: "user1@email.com"},
		{
			BaseModel: models.BaseModel{
				ID: "user-2",
			},
			Email: "user2@email.com"},
		{
			BaseModel: models.BaseModel{
				ID: "user-3",
			},
			Email: "user3@email.com"},
	}

	for _, testuser := range testUsers {
		err := db.Create(&testuser).Error
		if err != nil {
			t.Errorf("Failed to create user: %v", err)
		}
	}

	users, err := repo.List(ctx)
	assert.NoError(t, err)
	assert.Len(t, *users, len(testUsers))
}

func TestUpdate(t *testing.T) {
	_, repo := setupUserRepo(t)

	tests := []struct {
		name        string
		record      *models.User
		input       *models.UserUpdate
		expectError bool
	}{
		{
			name: "should update user successfully",
			record: &models.User{
				Email: "test@email.com",
			},
			input: &models.UserUpdate{
				Name: utils.StrToPtr("updated user"),
			},
			expectError: false,
		},
		{
			name: "should return error on duplicate email",
			record: &models.User{
				Email: "test2@email.com",
			},
			input: &models.UserUpdate{
				Email: utils.StrToPtr("test@email.com"),
			},
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctx := context.Background()

			record, _ := repo.Create(ctx, tt.record)
			updated, err := repo.Update(ctx, record.ID, tt.input)

			if tt.expectError {
				assert.Error(t, err)
				assert.True(t, errors.Is(err, gorm.ErrDuplicatedKey))
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.input.Name, updated.Name)
				assert.NotNil(t, updated.UpdatedAt)
			}
		})
	}
}

func TestDelete(t *testing.T) {
	db, repo := setupUserRepo(t)
	ctx := context.Background()
	testUser := &models.User{
		BaseModel: models.BaseModel{
			ID: "user-1",
		},
		Email: "user1@email.com",
	}

	_, _ = repo.Create(ctx, testUser)
	err := repo.Delete(ctx, "user-1")
	assert.NoError(t, err)

	var count int64
	assert.NoError(t, db.WithContext(ctx).Model(&models.User{}).Where("id = ?", "user-1").Count(&count).Error)
	assert.Equal(t, count, int64(0))
}
