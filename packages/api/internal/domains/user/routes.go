package user

import "github.com/gin-gonic/gin"

type IHandler interface {
	CreateUserHandler() gin.HandlerFunc
}

func RegisterRoutes(r gin.RouterGroup, handler IHandler) {
	route := r.Group("/users")

	route.POST("", handler.CreateUserHandler())
}
