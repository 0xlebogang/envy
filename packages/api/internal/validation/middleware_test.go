package validation

import (
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/stretchr/testify/assert"
)

func TestMiddleware(t *testing.T) {
	Init()

	c, _ := gin.CreateTestContext(nil)

	middlewareFunc := Middleware()
	middlewareFunc(c)

	validatorValue, exists := c.Get("validator")
	assert.True(t, exists, "validator not set in context")
	assert.NotNil(t, validatorValue, "validator value is nil")

	validator, ok := validatorValue.(*validator.Validate)
	assert.True(t, ok, "validator value is not of type *validator.Validate")
	assert.Equal(t, GetValidator(), validator, "validator instance does not match the initialized instance")
}
