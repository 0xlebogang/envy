package user

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

func TestCreateUser(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name           string
		body           string
		setupMock      func(m *MockService)
		expectedStatus int
		expectedBody   string
	}{
		{
			name: "should create user successfully",
			body: `{"email": "test@email.com"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					Register(mock.Anything, mock.AnythingOfType("*models.User")).
					Return(&models.User{Email: "test@email.com"}, nil)
			},
			expectedStatus: http.StatusCreated,
			expectedBody:   `"email":"test@email.com"`,
		},
		{
			name: "should return 422 on fail to create user on invalid input",
			body: `{invalid json}`,
			setupMock: func(m *MockService) {
				// No expected register calls
			},
			expectedStatus: http.StatusUnprocessableEntity,
			expectedBody:   `"error"`,
		},
		{
			name: "should return 409 on fail to create user on duplicate email",
			body: `{"email": "test@email.com"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					Register(mock.Anything, mock.AnythingOfType("*models.User")).
					Return(nil, gorm.ErrDuplicatedKey)
			},
			expectedStatus: http.StatusConflict,
			expectedBody:   "email already in use",
		},
		{
			name: "should return 500 on fail to create user on unexpected error",
			body: `{"email": "test@email.com"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					Register(mock.Anything, mock.AnythingOfType("*models.User")).
					Return(nil, errors.New("failed to register user"))
			},
			expectedStatus: http.StatusInternalServerError,
			expectedBody:   http.StatusText(http.StatusInternalServerError),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockSvc := NewMockService(t)
			tt.setupMock(mockSvc)

			h := NewHandler(mockSvc)
			router := gin.Default()
			router.POST("/users", h.CreateUser())

			req := httptest.NewRequest(http.MethodPost, "/users", strings.NewReader(tt.body))
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			router.ServeHTTP(rec, req)

			assert.Equal(t, tt.expectedStatus, rec.Code)
			assert.Contains(t, rec.Body.String(), tt.expectedBody)
			assert.NotContains(t, rec.Body.String(), "password")
		})
	}
}

func TestGetUserByID(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name           string
		input          string
		setupMock      func(m *MockService)
		expectedStatus int
		expectedBody   string
	}{
		{
			name:  "should get user successfully",
			input: "user-1",
			setupMock: func(m *MockService) {
				m.EXPECT().
					FindByID(mock.Anything, "user-1").
					Return(&models.User{Email: "test@email.com"}, nil)
			},
			expectedStatus: http.StatusOK,
			expectedBody:   `"email":"test@email.com"`,
		},
		{
			name:  "should respond with 404 on fail to get user",
			input: "non-existent-user",
			setupMock: func(m *MockService) {
				m.EXPECT().
					FindByID(mock.Anything, "non-existent-user").
					Return(nil, gorm.ErrRecordNotFound)
			},
			expectedStatus: http.StatusNotFound,
			expectedBody:   http.StatusText(http.StatusNotFound),
		},
		{
			name:  "should return 500 on fail to get user",
			input: "user-1",
			setupMock: func(m *MockService) {
				m.EXPECT().
					FindByID(mock.Anything, "user-1").
					Return(nil, errors.New("failed to get user"))
			},
			expectedStatus: http.StatusInternalServerError,
			expectedBody:   http.StatusText(http.StatusInternalServerError),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockSvc := NewMockService(t)
			tt.setupMock(mockSvc)

			h := NewHandler(mockSvc)
			router := gin.Default()
			router.GET("/users/:id", h.GetUserByID())

			req := httptest.NewRequest(http.MethodGet, "/users/"+tt.input, nil)
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			router.ServeHTTP(rec, req)

			assert.Equal(t, tt.expectedStatus, rec.Code)
			assert.Contains(t, rec.Body.String(), tt.expectedBody)
		})
	}
}

func TestGetUserByEmail(t *testing.T) {
	t.Skip()
}

func TestGetAllUsersHandler(t *testing.T) {
	gin.SetMode(gin.TestMode)

	testUsers := &[]models.User{
		{Email: "user1@email.com"},
		{Email: "user2@email.com"},
		{Email: "user3@email.com"},
	}

	tests := []struct {
		name           string
		setupMock      func(m *MockService)
		expectedStatus int
		expectedBody   string
	}{
		{
			name: "should get all users",
			setupMock: func(m *MockService) {
				m.EXPECT().
					GetAllUsers(mock.Anything).
					Return(testUsers, nil)
			},
			expectedStatus: http.StatusOK,

			// Body should container all emails listed in testUsers
			expectedBody: "",
		},
		{
			name: "should return 500 on fail to get all users",
			setupMock: func(m *MockService) {
				m.EXPECT().
					GetAllUsers(mock.Anything).
					Return(nil, errors.New("failed to get all users"))
			},
			expectedStatus: http.StatusInternalServerError,
			expectedBody:   http.StatusText(http.StatusInternalServerError),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockSvc := NewMockService(t)
			tt.setupMock(mockSvc)

			h := NewHandler(mockSvc)
			router := gin.Default()
			router.GET("/users", h.GetAllUsers())

			req := httptest.NewRequest(http.MethodGet, "/users", nil)
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			router.ServeHTTP(rec, req)

			assert.Equal(t, tt.expectedStatus, rec.Code)

			if tt.expectedStatus == http.StatusInternalServerError {
				assert.Contains(t, rec.Body.String(), tt.expectedBody)
			} else {
				for _, user := range *testUsers {
					assert.Contains(t, rec.Body.String(), user.Email)
				}
			}
		})
	}
}

func TestUpdateUser(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name           string
		id             string
		updateData     string
		setupMock      func(m *MockService)
		expectedStatus int
		expectedBody   string
	}{
		{
			name:       "should update user successfully",
			id:         "user-1",
			updateData: `{"name":"Test User"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					UpdateUserProfile(mock.Anything, "user-1", mock.AnythingOfType("*models.UserUpdate")).
					Return(&models.User{Email: "test@email.com", Name: utils.StrToPtr("Test User")}, nil)
			},
			expectedStatus: http.StatusOK,
			expectedBody:   `"name":"Test User"`,
		},
		{
			name:       "should return 422 on fail to update user profile with invalid input",
			id:         "user-1",
			updateData: `{invalid json}`,
			setupMock: func(m *MockService) {
				// UpdateUserProfile service is never called.
			},
			expectedStatus: http.StatusUnprocessableEntity,
			expectedBody:   `"error"`,
		},
		{
			name:       "should return 404 on fail to update user profile when user not found",
			id:         "non-existent-user",
			updateData: `{"name":"Test User"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					UpdateUserProfile(mock.Anything, "non-existent-user", mock.AnythingOfType("*models.UserUpdate")).
					Return(nil, gorm.ErrRecordNotFound)
			},
			expectedStatus: http.StatusNotFound,
			expectedBody:   http.StatusText(http.StatusNotFound),
		},
		{
			name:       "should return 409 on fail to update user profile on duplicate email",
			id:         "user-1",
			updateData: `{"email":"existing@email.com"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					UpdateUserProfile(mock.Anything, "user-1", mock.AnythingOfType("*models.UserUpdate")).
					Return(nil, gorm.ErrDuplicatedKey)
			},
			expectedStatus: http.StatusConflict,
			expectedBody:   "email already in use",
		},
		{
			name:       "should return 500 on fail to update user profile on unexpected error",
			id:         "user-1",
			updateData: `{"name":"Test User"}`,
			setupMock: func(m *MockService) {
				m.EXPECT().
					UpdateUserProfile(mock.Anything, "user-1", mock.AnythingOfType("*models.UserUpdate")).
					Return(nil, errors.New("unexpected error"))
			},
			expectedStatus: http.StatusInternalServerError,
			expectedBody:   http.StatusText(http.StatusInternalServerError),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockSvc := NewMockService(t)
			tt.setupMock(mockSvc)

			h := NewHandler(mockSvc)
			router := gin.Default()
			router.PATCH("/users/:id", h.UpdateUser())

			req := httptest.NewRequest(http.MethodPatch, "/users/"+tt.id, strings.NewReader(tt.updateData))
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			router.ServeHTTP(rec, req)

			assert.Equal(t, tt.expectedStatus, rec.Code)
			assert.Contains(t, rec.Body.String(), tt.expectedBody)
		})
	}
}

func TestDeleteUser(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name           string
		input          string
		setupMock      func(m *MockService)
		expectedStatus int
		expectedBody   string
	}{
		{
			name:  "should delete user successfully",
			input: "user-1",
			setupMock: func(m *MockService) {
				m.EXPECT().
					RemoveAccount(mock.Anything, "user-1").
					Return(nil)
			},
			expectedStatus: http.StatusNoContent,
			expectedBody:   "",
		},
		{
			name:  "should return 404 on fail to delete user profile when user not found",
			input: "non-existent-user",
			setupMock: func(m *MockService) {
				m.EXPECT().
					RemoveAccount(mock.Anything, "non-existent-user").
					Return(gorm.ErrRecordNotFound)
			},
			expectedStatus: http.StatusNotFound,
			expectedBody:   http.StatusText(http.StatusNotFound),
		},
		{
			name:  "should return 500 on fail to delete user profile on unexpected error",
			input: "user-1",
			setupMock: func(m *MockService) {
				m.EXPECT().
					RemoveAccount(mock.Anything, "user-1").
					Return(errors.New("failed to remove account"))
			},
			expectedStatus: http.StatusInternalServerError,
			expectedBody:   http.StatusText(http.StatusInternalServerError),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockSvc := NewMockService(t)
			tt.setupMock(mockSvc)

			h := NewHandler(mockSvc)
			router := gin.Default()
			router.DELETE("/users/:id", h.DeleteUser())

			req := httptest.NewRequest(http.MethodDelete, "/users/"+tt.input, nil)
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			router.ServeHTTP(rec, req)

			assert.Equal(t, tt.expectedStatus, rec.Code)

			if tt.expectedBody != "" {
				assert.Contains(t, rec.Body.String(), tt.expectedBody)
			}
		})
	}
}
