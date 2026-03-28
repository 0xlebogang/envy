package user

import (
	"context"
	"errors"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/utils"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

func TestRegister(t *testing.T) {
	testUser := &models.User{Email: "test@email.com"}
	tests := []struct {
		name      string
		input     *models.User
		setupMock func(repo *MockRepository)
		expectErr bool
	}{
		{
			name:  "should register new user successfully",
			input: testUser,
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					Create(mock.Anything, testUser).
					Return(testUser, nil)
			},
			expectErr: false,
		},
		{
			name:  "should fail to register new user",
			input: testUser,
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					Create(mock.Anything, testUser).
					Return(nil, errors.New("creation failed"))
			},
			expectErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo)
			ctx := context.Background()

			result, err := svc.Register(ctx, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)
				assert.Equal(t, tt.input.Email, result.Email)
			}
		})
	}
}

func TestFindByID(t *testing.T) {
	testUser := &models.User{
		BaseModel: models.BaseModel{ID: "user-1"},
		Email:     "user1@email.com",
	}
	tests := []struct {
		name      string
		input     string
		setupMock func(repo *MockRepository)
		expectErr bool
	}{
		{
			name:  "should find and return user successfully",
			input: "user-1",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					GetByID(mock.Anything, "user-1").
					Return(testUser, nil)
			},
			expectErr: false,
		},
		{
			name:  "should fail to find user",
			input: "non-existent-id",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					GetByID(mock.Anything, "non-existent-id").
					Return(nil, gorm.ErrRecordNotFound)
			},
			expectErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo)
			ctx := context.Background()

			result, err := svc.FindByID(ctx, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)
				assert.Equal(t, testUser.BaseModel.ID, result.BaseModel.ID)
			}
		})
	}
}

func TestFindByEmail(t *testing.T) {
	testUser := &models.User{Email: "test@email.com"}
	tests := []struct {
		name      string
		input     string
		setupMock func(repo *MockRepository)
		expectErr bool
	}{
		{
			name:  "should find and return user successfully",
			input: "test@email.com",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					GetByEmail(mock.Anything, "test@email.com").
					Return(testUser, nil)
			},
			expectErr: false,
		},
		{
			name:  "should fail to find user",
			input: "non-existent-user@email.com",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					GetByEmail(mock.Anything, "non-existent-user@email.com").
					Return(nil, gorm.ErrRecordNotFound)
			},
			expectErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo)
			ctx := context.Background()

			result, err := svc.FindByEmail(ctx, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)
				assert.Equal(t, testUser.Email, result.Email)
			}
		})
	}
}

func TestGetAllUsers(t *testing.T) {
	testUser := []models.User{
		models.User{Email: "user1@email.com"},
		models.User{Email: "user2@email.com"},
		models.User{Email: "user3@email.com"},
	}

	tests := []struct {
		name      string
		setupMock func(repo *MockRepository)
		expectErr bool
	}{
		{
			name: "should return all users successfully",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					List(mock.Anything).
					Return(&testUser, nil)
			},
			expectErr: false,
		},
		{
			name: "should fail to return all users",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					List(mock.Anything).
					Return(nil, errors.New("failed to list users"))
			},
			expectErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo)
			ctx := context.Background()

			result, err := svc.GetAllUsers(ctx)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)
				assert.Len(t, *result, len(testUser))
			}
		})
	}
}

func TestUpdateUserProfile(t *testing.T) {
	updateData := &models.UserUpdate{Name: utils.StrToPtr("updated user")}

	tests := []struct {
		name      string
		id        string
		input     *models.UserUpdate
		setupMock func(repo *MockRepository)
		expectErr bool
	}{
		{
			name:  "should update user profile successfully",
			id:    "user-1",
			input: updateData,
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					Update(mock.Anything, "user-1", updateData).
					Return(&models.User{Name: utils.StrToPtr("updated user")}, nil)
			},
			expectErr: false,
		},
		{
			name:  "should faild to update user profile",
			id:    "user-1",
			input: updateData,
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					Update(mock.Anything, "user-1", updateData).
					Return(nil, gorm.ErrRecordNotFound)
			},
			expectErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo)
			ctx := context.Background()

			result, err := svc.UpdateUserProfile(ctx, tt.id, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)
				assert.Equal(t, updateData.Name, result.Name)
			}
		})
	}
}

func TestRemoveAccount(t *testing.T) {
	tests := []struct {
		name      string
		input     string
		setupMock func(repo *MockRepository)
		expectErr bool
	}{
		{
			name:  "should delete user successfully",
			input: "user-1",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					Delete(mock.Anything, "user-1").
					Return(nil)
			},
			expectErr: false,
		},
		{
			name:  "should fail to delete user account",
			input: "non-existent-id",
			setupMock: func(repo *MockRepository) {
				repo.EXPECT().
					Delete(mock.Anything, "non-existent-id").
					Return(errors.New("failed to delete user"))
			},
			expectErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo)
			ctx := context.Background()

			err := svc.RemoveAccount(ctx, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}
