package validation

import "github.com/gin-gonic/gin"

func Middleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		validator := GetValidator()
		ctx.Set("validator", validator)
		ctx.Next()
	}
}
