package middlewares

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ErrorResponse struct {
	Error   string                 `json:"error,omitempty"`
	Message string                 `json:"message"`
	Code    string                 `json:"code,omitempty"`
	Details map[string]interface{} `json:"details,omitempty"`
}

type AppError struct {
	Code    string
	Message string
	Details map[string]interface{}
	Status  int
	Err     error
}

func (e *AppError) Error() string {
	return e.Message
}

func BadRequestError(message string, details map[string]interface{}) *AppError {
	return &AppError{
		Code:    "BAD_REQUEST",
		Message: message,
		Details: details,
		Status:  http.StatusBadRequest,
	}
}

func NotFoundError(resource string) *AppError {
	return &AppError{
		Code:    "NOT_FOUND",
		Message: fmt.Sprintf("%s not found", resource),
		Status:  http.StatusNotFound,
	}
}

func InternalServerError(message string, details map[string]interface{}) *AppError {
	return &AppError{
		Code:    "INTERNAL_SERVER_ERROR",
		Message: message,
		Details: details,
		Status:  http.StatusInternalServerError,
	}
}

func ErrorHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				ctx.JSON(http.StatusInternalServerError, ErrorResponse{
					Error:   "INTERNAL_SERVER_ERROR",
					Message: "An unexpected error occurred",
				})
				ctx.Abort()
			}
		}()

		ctx.Next()

		if len(ctx.Errors) > 0 {
			err := ctx.Errors.Last().Err
			if appErr, ok := err.(*AppError); ok {
				log.Printf("Apllication Error [%s]: %s - %v",
					appErr.Code,
					appErr.Message,
					appErr.Err,
				)
				ctx.JSON(appErr.Status, ErrorResponse{
					Error:   appErr.Code,
					Message: appErr.Message,
					Code:    appErr.Code,
					Details: appErr.Details,
				})
				return
			}

			if errors.Is(err, gorm.ErrRecordNotFound) {
				log.Printf("Record not found: %v", err)
				ctx.JSON(http.StatusNotFound, ErrorResponse{
					Error:   "NOT_FOUND",
					Message: "The requested resource was not found",
				})
				return
			}
		}
	}
}
