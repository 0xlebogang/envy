package integration

import (
	"context"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/domain/user"
	"github.com/0xlebogang/envy/backend/internal/utils"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
)

func setupUserRepo(t *testing.T) (*gorm.DB, user.Repository) {
	db := setupTestDB(t)
	require.NoError(t, db.Exec("DELETE FROM users;").Error)
	repo := user.NewRepo(db)
	return db, repo
}

func TestCreate(t *testing.T) {
	db, repo := setupUserRepo(t)
	ctx := context.Background()
	testUser := &models.User{
		BaseModel: models.BaseModel{
			ID: "user-1",
		},
		Email: "create@email.com",
	}

	created, err := repo.Create(ctx, testUser)
	assert.NoError(t, err)
	assert.Equal(t, created.BaseModel.ID, testUser.BaseModel.ID)

	var dbUser models.User
	assert.NoError(t, db.First(&dbUser, "id = ?", testUser.BaseModel.ID).Error)
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
	db, repo := setupUserRepo(t)
	ctx := context.Background()
	testUser := &models.User{
		BaseModel: models.BaseModel{
			ID: "user-1",
		},
		Email: "user1@email.com",
	}

	updateData := &models.User{
		Name: utils.StrToPtr("Test User"),
	}

	_ = db.WithContext(ctx).Create(testUser)
	updated, err := repo.Update(ctx, testUser.BaseModel.ID, updateData)
	assert.NoError(t, err)
	assert.Equal(t, testUser.Name, updated.Name)
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
