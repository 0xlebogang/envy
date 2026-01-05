package user

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/0xlebogang/sekrets/internal/middlewares"
	"github.com/0xlebogang/sekrets/internal/validation"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type UserHandlers interface {
	CreateUser() gin.HandlerFunc
	GetUser() gin.HandlerFunc
	UpdateUser() gin.HandlerFunc
	DeleteUser() gin.HandlerFunc
}

const (
	InvalidInput     = "Invalid input provided"
	ValidationFailed = "Validation failed"
	IDValueRequired  = "User ID is required"
	MalformedRequest = "Malformed request context"
)

type Handler struct {
	service UserRepository
}

func NewHandler(service UserRepository) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var data UserModel
		if err := ctx.ShouldBindJSON(&data); err != nil {
			appErr := middlewares.BadRequestError(InvalidInput, map[string]interface{}{"error": err.Error()})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		if err := ctx.MustGet(validation.ValidatorKey).(*validator.Validate).Struct(data); err != nil {
			appErr := middlewares.BadRequestError(ValidationFailed, map[string]interface{}{"errors": validation.FormatValidationError(err)})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		createdUser, err := h.service.CreateUser(&data)
		if err != nil {
			appErr := middlewares.InternalServerError("Failed to create user", map[string]interface{}{"error": err.Error()})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{
			"data": createdUser,
		})
	}
}

func (h *Handler) GetUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.Param("id")
		if userID == "" {
			appErr := middlewares.BadRequestError(IDValueRequired, nil)
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		user, err := h.service.GetUser(userID)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				appErr := middlewares.NotFoundError(fmt.Sprintf("User with ID: %s", userID))
				if err := ctx.Error(appErr); err != nil {
					panic(MalformedRequest)
				}
				return
			}

			appErr := middlewares.InternalServerError("Failed to retrieve user", map[string]interface{}{"error": err.Error()})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"data": user,
		})
	}
}

func (h *Handler) UpdateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.Param("id")
		if userID == "" {
			appErr := middlewares.BadRequestError(IDValueRequired, nil)
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		var data UserUpdateInput
		if err := ctx.ShouldBindJSON(&data); err != nil {
			appErr := middlewares.BadRequestError(InvalidInput, map[string]interface{}{"error": err.Error()})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		if err := ctx.MustGet(validation.ValidatorKey).(*validator.Validate).Struct(data); err != nil {
			appErr := middlewares.BadRequestError(ValidationFailed, map[string]interface{}{"errors": validation.FormatValidationError(err)})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		updatedUser, err := h.service.UpdateUser(userID, &data)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				appErr := middlewares.NotFoundError(fmt.Sprintf("User with ID: %s", userID))
				if err := ctx.Error(appErr); err != nil {
					panic(MalformedRequest)
				}
				return
			}

			appErr := middlewares.InternalServerError("Failed to update user", map[string]interface{}{"error": err.Error()})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"data": updatedUser,
		})
	}
}

func (h *Handler) DeleteUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.Param("id")
		if userID == "" {
			appErr := middlewares.BadRequestError(IDValueRequired, nil)
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		if err := h.service.DeleteUser(userID); err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				appErr := middlewares.NotFoundError(fmt.Sprintf("User with ID: %s", userID))
				if err := ctx.Error(appErr); err != nil {
					panic(MalformedRequest)
				}
				return
			}

			appErr := middlewares.InternalServerError("Failed to delete user", map[string]interface{}{"error": err.Error()})
			if err := ctx.Error(appErr); err != nil {
				panic(MalformedRequest)
			}
			return
		}

		ctx.JSON(http.StatusNoContent, nil)
	}
}
