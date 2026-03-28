package user

import (
	"errors"
	"log/slog"
	"net/http"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	svc Service
}

func NewHandler(svc Service) Handler {
	return handler{svc}
}

func (h handler) CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()

		var req models.User
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := h.svc.Register(ctx, &req)
		if err != nil {
			if errors.Is(err, gorm.ErrDuplicatedKey) {
				c.JSON(http.StatusConflict, gin.H{"error": "email already in use"})
				return
			}

			slog.Error("failed to create user:", "error", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": http.StatusText(http.StatusInternalServerError)})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"user": user.Response()})
	}
}

func (h handler) GetUserByID() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		id := c.Param("id")

		user, err := h.svc.FindByID(ctx, id)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{"error": http.StatusText(http.StatusNotFound)})
				return
			}

			slog.Error("failed to find user", "id", id, "error", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": http.StatusText(http.StatusInternalServerError)})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}

func (h handler) GetUserByEmail() gin.HandlerFunc {
	//TODO implement me
	panic("implement me")
}

func (h handler) GetAllUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		users, err := h.svc.GetAllUsers(ctx)
		if err != nil {
			slog.Error("failed to get all users:", "error", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": http.StatusText(http.StatusInternalServerError)})
			return
		}

		c.JSON(http.StatusOK, gin.H{"users": users})
	}
}

func (h handler) UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		id := c.Param("id")

		var req models.UserUpdate
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := h.svc.UpdateUserProfile(ctx, id, &req)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{"error": http.StatusText(http.StatusNotFound)})
				return
			}

			if errors.Is(err, gorm.ErrDuplicatedKey) {
				c.JSON(http.StatusConflict, gin.H{"error": "email already in use"})
				return
			}

			slog.Error("failed to update user:", "error", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": http.StatusText(http.StatusInternalServerError)})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}

func (h handler) DeleteUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		id := c.Param("id")

		err := h.svc.RemoveAccount(ctx, id)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{"error": http.StatusText(http.StatusNotFound)})
				return
			}

			slog.Error("failed to remove account", "error", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": http.StatusText(http.StatusInternalServerError)})
			return
		}

		c.JSON(http.StatusNoContent, nil)
	}
}
