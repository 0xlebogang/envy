package routes

import (
	"github.com/0xlebogang/sekrets/internal/api/handlers"
	"github.com/gin-gonic/gin"
)

type ISystemRoutes interface{}

type SystemRoutes struct {
	handlers handlers.ISystemHandlers
}

func New(handlers handlers.ISystemHandlers) *SystemRoutes {
	return &SystemRoutes{
		handlers: handlers,
	}
}

func (r *SystemRoutes) Register(routerGroup *gin.Engine) {
	routerGroup.GET("/health", r.handlers.HealthCheck())
}
