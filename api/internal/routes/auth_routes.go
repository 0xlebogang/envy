package routes

import (
	"github.com/0xlebogang/sekrets/internal/handlers"
	"github.com/gin-gonic/gin"
)

type IAuthRoutes interface {
	Register(r *gin.RouterGroup)
}

type AuthRoutes struct {
	handlers *handlers.AuthHandlers
}

func New(handlers *handlers.AuthHandlers) *AuthRoutes {
	return &AuthRoutes{handlers: handlers}
}

func (a *AuthRoutes) Register(r *gin.RouterGroup) {
	route := r.Group("/auth")

	route.GET("/login", a.handlers.LoginHandler())
	route.GET("/callback", a.handlers.CallbackHandler())
	route.POST("/logout", a.handlers.LogoutHandler())
	// route.GET("/me", a.handlers.MeHandler())
}
