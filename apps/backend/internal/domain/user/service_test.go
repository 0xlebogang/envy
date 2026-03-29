package user

import (
	"context"
	"errors"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/utils"
	"github.com/0xlebogang/envy/backend/internal/utils/utils_mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

func TestRegister(t *testing.T) {
	testUser := &models.User{Email: "test@email.com"}
	tests := []struct {
		name              string
		input             *models.User
		setupMockRepo     func(m *MockRepository)
		setupMockPwdUtils func(m *utils_mocks.MockPasswordUtils)
		expectErr         bool
	}{
		{
			name:  "should register new user successfully",
			input: testUser,
			setupMockRepo: func(m *MockRepository) {
				m.EXPECT().
					Create(mock.Anything, testUser).
					Return(testUser, nil)
			},
			setupMockPwdUtils: nil,
			expectErr:         false,
		},
		{
			name: "should register new user with hashed password",
			input: &models.User{
				Email:    testUser.Email,
				Password: utils.StrToPtr("raw-password"),
			},
			setupMockRepo: func(m *MockRepository) {
				m.EXPECT().
					Create(mock.Anything, &models.User{
						Email:    testUser.Email,
						Password: utils.StrToPtr("hashed-password"),
					}).
					Return(&models.User{
						Email:    testUser.Email,
						Password: utils.StrToPtr("hashed-password"),
					}, nil)
			},
			setupMockPwdUtils: func(m *utils_mocks.MockPasswordUtils) {
				m.EXPECT().
					Hash("raw-password").
					Return("hashed-password", nil)
			},
			expectErr: false,
		},
		{
			name:  "should fail to register new user",
			input: testUser,
			setupMockRepo: func(m *MockRepository) {
				m.EXPECT().
					Create(mock.Anything, testUser).
					Return(nil, errors.New("creation failed"))
			},
			setupMockPwdUtils: nil,
			expectErr:         true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			mockPwdUtils := utils_mocks.NewMockPasswordUtils(t)
			tt.setupMockRepo(mockRepo)

			if tt.setupMockPwdUtils != nil {
				tt.setupMockPwdUtils(mockPwdUtils)
			}

			svc := NewSvc(mockRepo, mockPwdUtils)
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
		name          string
		input         string
		setupMockRepo func(repo *MockRepository)
		expectErr     bool
	}{
		{
			name:  "should find and return user successfully",
			input: "user-1",
			setupMockRepo: func(repo *MockRepository) {
				repo.EXPECT().
					GetByID(mock.Anything, "user-1").
					Return(testUser, nil)
			},
			expectErr: false,
		},
		{
			name:  "should fail to find user",
			input: "non-existent-id",
			setupMockRepo: func(repo *MockRepository) {
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
			mockPwdUtils := utils_mocks.NewMockPasswordUtils(t)
			tt.setupMockRepo(mockRepo)

			svc := NewSvc(mockRepo, mockPwdUtils)
			ctx := context.Background()

			result, err := svc.FindByID(ctx, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)
				assert.Equal(t, testUser.ID, result.ID)
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
			mockPwdUtils := utils_mocks.NewMockPasswordUtils(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo, mockPwdUtils)
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
			mockPwdUtils := utils_mocks.NewMockPasswordUtils(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo, mockPwdUtils)
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
		name          string
		id            string
		input         *models.UserUpdate
		setupMock     func(m *MockRepository)
		setupPwdUtils func(m *utils_mocks.MockPasswordUtils)
		expectErr     bool
	}{
		{
			name:  "should update user profile successfully",
			id:    "user-1",
			input: updateData,
			setupMock: func(m *MockRepository) {
				m.EXPECT().
					Update(mock.Anything, "user-1", updateData).
					Return(&models.User{Name: utils.StrToPtr("updated user")}, nil)
			},
			setupPwdUtils: nil,
			expectErr:     false,
		},
		{
			name: "should update user password & hash password successfully",
			id:   "user-1",
			input: &models.UserUpdate{
				Password: utils.StrToPtr("raw-password"),
			},
			setupMock: func(m *MockRepository) {
				m.EXPECT().
					Update(mock.Anything, "user-1", &models.UserUpdate{
						Password: utils.StrToPtr("hashed-password"),
					}).
					Return(&models.User{
						Password: utils.StrToPtr("hashed-password"),
					}, nil)
			},
			setupPwdUtils: func(m *utils_mocks.MockPasswordUtils) {
				m.EXPECT().
					Hash("raw-password").
					Return("hashed-password", nil)
			},
			expectErr: false,
		},
		{
			name:  "should faild to update user profile",
			id:    "user-1",
			input: updateData,
			setupMock: func(m *MockRepository) {
				m.EXPECT().
					Update(mock.Anything, "user-1", updateData).
					Return(nil, gorm.ErrRecordNotFound)
			},
			setupPwdUtils: nil,
			expectErr:     true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := NewMockRepository(t)
			mockPwdUtils := utils_mocks.NewMockPasswordUtils(t)
			tt.setupMock(mockRepo)

			if tt.setupPwdUtils != nil {
				tt.setupPwdUtils(mockPwdUtils)
			}

			svc := NewSvc(mockRepo, mockPwdUtils)
			ctx := context.Background()

			result, err := svc.UpdateUserProfile(ctx, tt.id, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				assert.Nil(t, result)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, result)

				if tt.input.Name != nil {
					assert.Equal(t, *tt.input.Name, *result.Name)
				}
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
			mockPwdUtils := utils_mocks.NewMockPasswordUtils(t)
			tt.setupMock(mockRepo)

			svc := NewSvc(mockRepo, mockPwdUtils)
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
