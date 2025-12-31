package handlers

import (
	"time"

	"github.com/gin-gonic/gin"
)

type Handlers struct {
}

func New() *Handlers {
	return &Handlers{}
}

func (h *Handlers) HealthCheck() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"status":    "ok",
			"success":   true,
			"timestamp": time.Now().Format(time.RFC1123),
		})
	}
}
