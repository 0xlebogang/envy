package user

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
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
			name: "should return 400 on fail to create user on invalid input",
			body: `{invalid json}`,
			setupMock: func(m *MockService) {
				// No expected register calls
			},
			expectedStatus: http.StatusBadRequest,
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
		})
	}
}
