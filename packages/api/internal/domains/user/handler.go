package user

import (
	"log"
	"net/http"

	"github.com/0xlebogang/sekrets/internal/middlewares"
	"github.com/0xlebogang/sekrets/internal/validation"
	"github.com/gin-gonic/gin"
	validator "github.com/go-playground/validator/v10"
)

type IService interface {
	CreateUser(user *UserModel) (*UserModel, error)
}

type Handler struct {
	service IService
}

func NewHandler(service IService) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) CreateUserHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newUserInput *UserModel
		if err := ctx.ShouldBindJSON(&newUserInput); err != nil {
			appErr := middlewares.BadRequestError("Invalid input", map[string]interface{}{"details": err.Error()})
			ctx.Error(appErr)
			return
		}

		validate := ctx.MustGet(validation.ValidatorKey).(*validator.Validate)
		if err := validate.Struct(newUserInput); err != nil {
			log.Printf("[APPLICATION ERROR]: %v", err)
			appErr := middlewares.BadRequestError("Validation failed", map[string]interface{}{"details": validation.FormatValidationError(err)})
			ctx.Error(appErr)
			return
		}

		createdUser, err := h.service.CreateUser(newUserInput)
		if err != nil {
			appErr := middlewares.InternalServerError("Failed to create user", map[string]interface{}{"details": err.Error()})
			ctx.Error(appErr)
			return
		}

		ctx.JSON(http.StatusCreated, gin.H{
			"data": createdUser,
		})
	}
}
