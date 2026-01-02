package validation

import "github.com/go-playground/validator/v10"

var instance *validator.Validate

func Init() {
	if instance == nil {
		instance = validator.New()
	}
}

func GetValidator() *validator.Validate {
	if instance == nil {
		panic("No validator initialized. Call validation.Init() first")
	}
	return instance
}

func FormatValidationError(err error) map[string]string {
	errMap := make(map[string]string)
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldErr := range validationErrors {
			errMap[fieldErr.Field()] = fieldErr.Tag()
		}
	}
	return errMap
}
