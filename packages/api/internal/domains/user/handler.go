package user

import (
	"net/http"

	"github.com/0xlebogang/sekrets/internal/validation"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type IService interface {
	CreateUser(user *UserModel) (*UserModel, error)
}

type Handler struct {
	service IService
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) CreateUserHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newUserInput *UserModel
		if err := ctx.ShouldBindJSON(&newUserInput); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error":   "Invalid input",
				"message": err.Error(),
			})
			return
		}

		validate := ctx.MustGet(validation.ValidatorKey).(*validator.Validate)
		if err := validate.Struct(&newUserInput); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error":  "Validation failed",
				"errors": validation.FormatValidationError(err),
			})
			return
		}

		createdUser, err := h.service.CreateUser(newUserInput)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error":   "An unexpected error occurred",
				"message": "User creation failed",
			})
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{
			"data": createdUser,
		})
	}
}
