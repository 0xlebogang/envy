package user

import (
	"errors"
	"testing"
	"time"

	"github.com/0xlebogang/sekrets/internal/domains/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockRepository struct {
	mock.Mock
}

func (m *MockRepository) Create(user *UserModel) (*UserModel, error) {
	args := m.Called(user)
	return args.Get(0).(*UserModel), args.Error(1)
}

func (m *MockRepository) GetAll() (*[]UserModel, error) {
	args := m.Called()
	return args.Get(0).(*[]UserModel), args.Error(1)
}

func (m *MockRepository) GetByID(id string) (*UserModel, error) {
	args := m.Called(id)
	return args.Get(0).(*UserModel), args.Error(1)
}

func (m *MockRepository) Update(id string, updates *UserUpdate) (*UserModel, error) {
	args := m.Called(id, updates)
	return args.Get(0).(*UserModel), args.Error(1)
}

func (m *MockRepository) Delete(id string) error {
	args := m.Called(id)
	return args.Error(0)
}

func TestCreateUserService(t *testing.T) {
	tests := []struct {
		name        string
		input       *UserModel
		mockReturn  *UserModel
		expectedErr error
	}{
		{
			name: "should create user successfully",
			input: &UserModel{
				Name:     "test user",
				Email:    "testuser@email.com",
				Password: &[]string{"securepassword"}[0],
			},
			mockReturn: &UserModel{
				BaseModel: common.BaseModel{
					ID:        "user-123",
					CreatedAt: time.Time{},
					UpdatedAt: time.Time{},
				},
				Name:  "test user",
				Email: "testuser@email.com",
			},
			expectedErr: nil,
		},
		{
			name: "should return error on failure",
			input: &UserModel{
				Name:     "test user",
				Email:    "testuser@email.com",
				Password: &[]string{"securepassword"}[0],
			},
			mockReturn:  nil,
			expectedErr: errors.New("creation failed error"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := new(MockRepository)
			mockRepo.On("Create", tt.input).Return(tt.mockReturn, tt.expectedErr)

			userService := &Service{repo: mockRepo}
			createdUser, err := userService.CreateUser(tt.input)

			assert.ErrorIs(t, err, tt.expectedErr)
			assert.Equal(t, tt.mockReturn, createdUser)
			mockRepo.AssertExpectations(t)
		})
	}
}

func TestGetAllUsers(t *testing.T) {
	tests := []struct {
		name        string
		mockReturn  *[]UserModel
		expectedErr error
	}{
		{
			name: "should get all users successfully",
			mockReturn: &[]UserModel{
				{
					BaseModel: common.BaseModel{
						ID:        "user-123",
						CreatedAt: time.Time{},
						UpdatedAt: time.Time{},
					},
					Name:  "user one",
					Email: "userone@email.com",
				},
				{
					BaseModel: common.BaseModel{
						ID:        "user-456",
						CreatedAt: time.Time{},
						UpdatedAt: time.Time{},
					},
					Name:  "user two",
					Email: "usertwo@email.com",
				},
			},
			expectedErr: nil,
		},
		{
			name:        "should return error on failure",
			mockReturn:  nil,
			expectedErr: errors.New("retrieval failed error"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := new(MockRepository)
			mockRepo.On("GetAll").Return(tt.mockReturn, tt.expectedErr)

			userService := &Service{repo: mockRepo}
			users, err := userService.GetAllUsers()

			assert.ErrorIs(t, err, tt.expectedErr)
			assert.Equal(t, tt.mockReturn, users)
			mockRepo.AssertExpectations(t)
		})
	}
}

func TestGetUserByID(t *testing.T) {
	tests := []struct {
		name        string
		inputID     string
		mockReturn  *UserModel
		expectedErr error
	}{
		{
			name:    "should get user by ID successfully",
			inputID: "user-123",
			mockReturn: &UserModel{
				BaseModel: common.BaseModel{
					ID:        "user-123",
					CreatedAt: time.Time{},
					UpdatedAt: time.Time{},
				},
				Name:  "test user",
				Email: "testuser@email.com",
			},
			expectedErr: nil,
		},
		{
			name:        "should return error on failure",
			inputID:     "user-456",
			mockReturn:  nil,
			expectedErr: errors.New("user not found error"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := new(MockRepository)
			mockRepo.On("GetByID", tt.inputID).Return(tt.mockReturn, tt.expectedErr)

			userService := &Service{repo: mockRepo}
			user, err := userService.GetUserByID(tt.inputID)

			assert.ErrorIs(t, err, tt.expectedErr)
			assert.Equal(t, tt.mockReturn, user)
			mockRepo.AssertExpectations(t)
		})
	}
}

func TestUpdateUser(t *testing.T) {
	tests := []struct {
		name        string
		inputID     string
		inputUpdate *UserUpdate
		mockReturn  *UserModel
		expectedErr error
	}{
		{
			name:    "should update user successfully",
			inputID: "user-123",
			inputUpdate: &UserUpdate{
				Email: &[]string{"updatedemail@email.com"}[0],
			},
			mockReturn: &UserModel{
				BaseModel: common.BaseModel{
					ID:        "user-123",
					CreatedAt: time.Time{},
					UpdatedAt: time.Time{},
				},
				Name:  "test user",
				Email: "updatedemail@email.com",
			},
			expectedErr: nil,
		},
		{
			name:    "should return error on failure",
			inputID: "user-456",
			inputUpdate: &UserUpdate{
				Name: &[]string{"updated name"}[0],
			},
			mockReturn:  nil,
			expectedErr: errors.New("update failed error"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := new(MockRepository)
			mockRepo.On("Update", tt.inputID, tt.inputUpdate).Return(tt.mockReturn, tt.expectedErr)

			userService := &Service{repo: mockRepo}
			updatedUser, err := userService.UpdateUser(tt.inputID, tt.inputUpdate)

			assert.ErrorIs(t, err, tt.expectedErr)
			assert.Equal(t, tt.mockReturn, updatedUser)
			mockRepo.AssertExpectations(t)
		})
	}
}

func TestDeleteUser(t *testing.T) {
	tests := []struct {
		name        string
		inputID     string
		expectedErr error
	}{
		{
			name:        "should delete user successfully",
			inputID:     "user-123",
			expectedErr: nil,
		},
		{
			name:        "should return error on failure",
			inputID:     "user-456",
			expectedErr: errors.New("deletion failed error"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := new(MockRepository)
			mockRepo.On("Delete", tt.inputID).Return(tt.expectedErr)

			userService := &Service{repo: mockRepo}
			err := userService.DeleteUser(tt.inputID)

			assert.ErrorIs(t, err, tt.expectedErr)
			mockRepo.AssertExpectations(t)
		})
	}
}
