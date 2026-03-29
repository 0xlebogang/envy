package user

import (
	"github.com/0xlebogang/envy/backend/internal/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Module struct {
	handler Handler
}

func newModule(h Handler) *Module {
	return &Module{handler: h}
}

func BuildModule(db *gorm.DB) *Module {
	repo := NewRepo(db)
	pwdUtils := utils.NewPasswordUtils()
	svc := NewSvc(repo, pwdUtils)
	handler := NewHandler(svc)
	return newModule(handler)
}

func (m *Module) RegisterRoutes(rg *gin.RouterGroup) {
	u := rg.Group("/users")
	{
		u.POST("", m.handler.CreateUser())
		u.GET("", m.handler.GetAllUsers())
		u.GET("/:id", m.handler.GetUserByID())
		u.PATCH("/:id", m.handler.UpdateUser())
		u.DELETE("/:id", m.handler.DeleteUser())
	}
}
