package common

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func HealthCheck(router *gin.Engine) {
	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"success":   true,
			"timestamp": time.Now().Format(time.RFC1123),
		})
	})
}
