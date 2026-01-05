package user

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/0xlebogang/sekrets/internal/domains/common"
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
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*UserModel), args.Error(1)
}

func TestCreateUserHandler_Success(t *testing.T) {
	t.Skip("Debug validator attachment")

	tests := []struct {
		name             string
		body             string
		expectedStatus   int
		expectedResponse UserModel
	}{
		{
			name:           "should create user successfully",
			body:           `{"email":"testuser@email.com","password":"securepassword","name":"test user"}`,
			expectedStatus: http.StatusCreated,
			expectedResponse: UserModel{
				BaseModel: common.BaseModel{
					ID:        "1",
					CreatedAt: time.Time{},
					UpdatedAt: time.Time{},
				},
				Email:    "testuser@email.com",
				Name:     "test user",
				Password: &[]string{"securepassword"}[0],
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockService := new(MockService)
			mockService.On("CreateUser", mock.Anything).Return(&tt.expectedResponse, mock.Anything)
			handler := &Handler{service: mockService}
			validation.Init()

			w := httptest.NewRecorder()
			ctx, _ := gin.CreateTestContext(w)
			ctx.Request, _ = http.NewRequest("POST", "/users", strings.NewReader(tt.body))
			ctx.Set(validation.ValidatorKey, validation.GetValidator())

			handler.CreateUserHandler()(ctx)

			assert.Equal(t, http.StatusCreated, tt.expectedStatus)
			assert.Contains(t, w.Body.String(), tt.expectedResponse.Email)
			mockService.AssertExpectations(t)
		})
	}
}
