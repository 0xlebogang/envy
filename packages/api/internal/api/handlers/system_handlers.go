package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type ISystemHandlers interface {
	HealthCheck() gin.HandlerFunc
}

type SystemHandlers struct{}

func NewSystemHandlers() *SystemHandlers {
	return &SystemHandlers{}
}

func (h *SystemHandlers) HealthCheck() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"success":   true,
			"timestamp": time.Now().Format(time.RFC1123),
		})
	}
}
