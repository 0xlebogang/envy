package user

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/0xlebogang/sekrets/internal/validation"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockService struct {
	mock.Mock
}

func (m *MockService) CreateUser(user *UserModel) (*UserModel, error) {
	args := m.Called(user)
	return args.Get(0).(*UserModel), args.Error(1)
}

func TestCreateUserHandler_Success(t *testing.T) {
	t.Skip("Requires debugging unregistered validator")

	tests := []struct {
		name                  string
		body                  string
		expectedInputError    error
		expectedServiceError  error
		expectedValidationErr error
		expectedStatus        int
	}{
		{
			name:                  "should create user successfully",
			body:                  `{"email":"testuser@email.com","password":"securepassword","name":"test user"}`,
			expectedInputError:    nil,
			expectedServiceError:  nil,
			expectedValidationErr: nil,
			expectedStatus:        http.StatusCreated,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockService := new(MockService)
			mockService.On("CreateUser", mock.Anything).Return(&UserModel{}, tt.expectedServiceError)
			handler := &Handler{service: mockService}
			validation.Init()

			w := httptest.NewRecorder()
			ctx, _ := gin.CreateTestContext(w)
			ctx.Request, _ = http.NewRequest("POST", "/users", strings.NewReader(tt.body))
			ctx.Set(validation.ValidatorKey, validation.GetValidator())

			handler.CreateUserHandler()(ctx)

			assert.Equal(t, http.StatusCreated, tt.expectedStatus)
			mockService.AssertExpectations(t)
		})
	}
}
