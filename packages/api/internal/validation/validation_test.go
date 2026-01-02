package validation

import (
	"testing"

	"github.com/go-playground/validator/v10"
	"github.com/stretchr/testify/assert"
)

func TestInit(t *testing.T) {
	instance = nil
	assert.Nil(t, instance, "Instance should be nil before initialization")
	Init()
	assert.NotNil(t, instance, "Instance should not be nil after initialization")
	assert.IsType(t, &validator.Validate{}, instance, "Instance should be of type *validator.Validate")
}

func TestGetValidator(t *testing.T) {
	instance = nil
	assert.Panics(t, func() {
		GetValidator()
	}, "GetValidator should panic if not initialized")

	Init()
	validatorInstance := GetValidator()
	assert.NotNil(t, validatorInstance, "GetValidator should return a non-nil instance after initialization")
	assert.Equal(t, instance, validatorInstance, "GetValidator should return the initialized instance")
}

func TestFormatValidationError(t *testing.T) {
	Init()
	validate := GetValidator()

	type TestStruct struct {
		Name  string `validate:"required"`
		Email string `validate:"required,email"`
		Age   int    `validate:"gte=0,lte=130"`
	}

	testData := TestStruct{
		Name:  "",
		Email: "invalid-email",
		Age:   150,
	}

	err := validate.Struct(testData)
	assert.NotNil(t, err, "Validation should return an error for invalid data")

	errMap := FormatValidationError(err)
	expectedErrors := map[string]string{
		"Name":  "required",
		"Email": "email",
		"Age":   "lte",
	}

	assert.Equal(t, expectedErrors, errMap, "Formatted error map should match expected errors")
}
