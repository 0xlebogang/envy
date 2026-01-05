package user

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.RouterGroup, handlers UserHandlers) {
	route := r.Group("/users")

	route.POST("", handlers.CreateUser())
	route.GET("/:id", handlers.GetUser())
	route.PATCH("/:id", handlers.UpdateUser())
	route.DELETE("/:id", handlers.DeleteUser())
}
