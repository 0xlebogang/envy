package user

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestModule_RegisterRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)

	expectedBody := `"ok":true`

	tests := []struct {
		name         string
		method       string
		path         string
		expectedCall string
	}{
		{
			name:         "should call CreateUser handler",
			method:       http.MethodPost,
			path:         "/api/v1/users",
			expectedCall: "CreateUser",
		},
		{
			name:         "should call GetAllUsers handler",
			method:       http.MethodGet,
			path:         "/api/v1/users",
			expectedCall: "GetAllUsers",
		},
		{
			name:         "should call GetUserByID handler",
			method:       http.MethodGet,
			path:         "/api/v1/users/1",
			expectedCall: "GetUserByID",
		},
		{
			name:         "should call UpdateUser handler",
			method:       http.MethodPatch,
			path:         "/api/v1/users/1",
			expectedCall: "UpdateUser",
		},
		{
			name:         "should call DeleteUser handler",
			method:       http.MethodDelete,
			path:         "/api/v1/users/1",
			expectedCall: "DeleteUser",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h := newFakeHandler()
			module := newModule(h)

			r := gin.Default()
			api := r.Group("/api")
			v1 := api.Group("/v1")
			module.RegisterRoutes(v1)

			req := httptest.NewRequest(tt.method, tt.path, nil)
			rec := httptest.NewRecorder()

			r.ServeHTTP(rec, req)

			assert.Equal(t, http.StatusOK, rec.Code)
			assert.Contains(t, rec.Body.String(), expectedBody)
		})
	}
}
