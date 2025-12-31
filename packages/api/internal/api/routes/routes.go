package routes

import (
	"github.com/0xlebogang/sekrets/internal/api/handlers"
	"github.com/gin-gonic/gin"
)

type Routes struct {
	handlers *handlers.Handlers
}

func New(handlers *handlers.Handlers) *Routes {
	return &Routes{
		handlers: handlers,
	}
}

func (r *Routes) Register(router *gin.Engine) {
	router.GET("/health", r.handlers.HealthCheck())
}
