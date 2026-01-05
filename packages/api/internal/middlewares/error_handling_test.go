package middlewares

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestErrorHandler(t *testing.T) {
	tests := []struct {
		name           string
		err            error
		extectedStatus int
		expectedCode   string
	}{
		{
			name:           "should pass through without error if ctx.Errors is empty",
			err:            nil,
			extectedStatus: 0,  // Whatever status code the downstream handler returns
			expectedCode:   "", // No error code expected
		},
		{
			name:           "should handle BadRequestError correctly",
			err:            BadRequestError("Invalid input", map[string]interface{}{"field": "name"}),
			extectedStatus: http.StatusBadRequest,
			expectedCode:   "BAD_REQUEST",
		},
		{
			name:           "should handle NotFoundError correctly",
			err:            NotFoundError("User"),
			extectedStatus: http.StatusNotFound,
			expectedCode:   "NOT_FOUND",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			ctx, _ := gin.CreateTestContext(w)

			if tt.err != nil {
				ctx.Error(tt.err)
			}

			middleware := ErrorHandler()
			middleware(ctx)

			if tt.err != nil {
				assert.Equal(t, tt.extectedStatus, w.Result().StatusCode)

				var resp ErrorResponse
				_ = json.Unmarshal(w.Body.Bytes(), &resp)
				t.Logf("[ERROR response]: %v", resp)

				assert.Equal(t, tt.expectedCode, resp.Code)
			}
		})
	}
}
