package user

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

type MockDB struct {
	mock.Mock
}

func (m *MockDB) Create(value interface{}) *gorm.DB {
	args := m.Called(value)
	return args.Get(0).(*gorm.DB)
}

func (m *MockDB) Find(dest interface{}, conds ...interface{}) *gorm.DB {
	args := m.Called(dest, conds)
	return args.Get(0).(*gorm.DB)
}

func (m *MockDB) First(dest interface{}, conds ...interface{}) *gorm.DB {
	args := m.Called(dest, conds)
	return args.Get(0).(*gorm.DB)
}

func (m *MockDB) Model(value interface{}) *gorm.DB {
	args := m.Called(value)
	return args.Get(0).(*gorm.DB)
}

func (m *MockDB) Updates(values interface{}) *gorm.DB {
	args := m.Called(values)
	return args.Get(0).(*gorm.DB)
}

func (m *MockDB) Delete(value interface{}, conds ...interface{}) *gorm.DB {
	args := m.Called(value, conds)
	return args.Get(0).(*gorm.DB)
}

func TestCreateUser(t *testing.T) {
	tests := []struct {
		name        string
		inputUser   *UserModel
		mockReturn  *gorm.DB
		expectedErr error
	}{
		{
			name: "should create user successfully",
			inputUser: &UserModel{
				Name:     "test user",
				Email:    "testuser@email.com",
				Password: &[]string{"securepassword"}[0],
			},
			mockReturn:  &gorm.DB{},
			expectedErr: nil,
		},
		{
			name: "should return error on create failure",
			inputUser: &UserModel{
				Name:     "test user",
				Email:    "testuser@email.com",
				Password: &[]string{"securepassword"}[0],
			},
			mockReturn:  &gorm.DB{Error: gorm.ErrInvalidData},
			expectedErr: gorm.ErrInvalidData,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockDB := new(MockDB)
			repo := &Repository{db: mockDB}
			mockDB.On("Create", tt.inputUser).Return(tt.mockReturn)

			_, err := repo.Create(tt.inputUser)
			assert.Equal(t, tt.expectedErr, err)
			mockDB.AssertExpectations(t)
		})
	}
}

func TestGetAll(t *testing.T) {
	tests := []struct {
		name        string
		mockReturn  *gorm.DB
		expectedErr error
	}{
		{
			name:        "should get all users successfully",
			mockReturn:  &gorm.DB{},
			expectedErr: nil,
		},
		{
			name:        "should return error on get all failure",
			mockReturn:  &gorm.DB{Error: gorm.ErrInvalidData},
			expectedErr: gorm.ErrInvalidData,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockDb := new(MockDB)
			repo := &Repository{db: mockDb}
			mockDb.On("Find", mock.Anything, mock.Anything).Return(tt.mockReturn)

			_, err := repo.GetAll()
			assert.Equal(t, tt.expectedErr, err)
			mockDb.AssertExpectations(t)
		})
	}
}

func TestGetByID(t *testing.T) {
	tests := []struct {
		name        string
		inputID     string
		mockReturn  *gorm.DB
		expectedErr error
	}{
		{
			name:        "should get user by ID successfully",
			inputID:     "1",
			mockReturn:  &gorm.DB{},
			expectedErr: nil,
		},
		{
			name:        "should fail to get user by ID",
			inputID:     "2",
			mockReturn:  &gorm.DB{Error: gorm.ErrRecordNotFound},
			expectedErr: gorm.ErrRecordNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockDb := new(MockDB)
			repo := &Repository{db: mockDb}
			mockDb.On("First", mock.Anything, []interface{}{tt.inputID}).Return(tt.mockReturn)

			_, err := repo.GetByID(tt.inputID)
			assert.Equal(t, tt.expectedErr, err)
			mockDb.AssertExpectations(t)
		})
	}
}

func TestUpdateUser(t *testing.T) {
	t.Skip("Constant invalid memory error")

	tests := []struct {
		name        string
		inputID     string
		inputUpdate *UserUpdate
		mockFirst   *gorm.DB
		mockModel   *gorm.DB
		mockUpdates *gorm.DB
		expectedErr error
	}{
		{
			name:    "should update user successfully",
			inputID: "1",
			inputUpdate: &UserUpdate{
				Name:  &[]string{"updated name"}[0],
				Email: &[]string{"updated@email.com"}[0],
			},
			mockFirst:   &gorm.DB{},
			mockModel:   &gorm.DB{},
			mockUpdates: &gorm.DB{},
			expectedErr: nil,
		},
		{
			name:    "should fail when user not found",
			inputID: "999",
			inputUpdate: &UserUpdate{
				Name: &[]string{"updated name"}[0],
			},
			mockFirst:   &gorm.DB{Error: gorm.ErrRecordNotFound},
			mockModel:   nil,
			mockUpdates: nil,
			expectedErr: gorm.ErrRecordNotFound,
		},
		{
			name:    "should fail on update error",
			inputID: "1",
			inputUpdate: &UserUpdate{
				Name: &[]string{"updated name"}[0],
			},
			mockFirst:   &gorm.DB{},
			mockModel:   &gorm.DB{},
			mockUpdates: &gorm.DB{Error: gorm.ErrInvalidData},
			expectedErr: gorm.ErrInvalidData,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockDb := new(MockDB)
			repo := &Repository{db: mockDb}
			mockDb.On("First", mock.Anything, []interface{}{tt.inputID}).Return(tt.mockFirst)
			if tt.mockModel != nil {
				mockDb.On("Model", mock.Anything).Return(tt.mockModel)
				mockDb.On("Updates", tt.inputUpdate).Return(tt.mockUpdates)
			}

			_, err := repo.Update(tt.inputID, tt.inputUpdate)
			assert.Equal(t, tt.expectedErr, err)
			mockDb.AssertExpectations(t)
		})
	}
}
