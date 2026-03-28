package user

import (
	"context"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/gin-gonic/gin"
)

type Repository interface {
	Create(ctx context.Context, u *models.User) (*models.User, error)
	GetByID(ctx context.Context, id string) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	List(ctx context.Context) (*[]models.User, error)
	Update(ctx context.Context, id string, u *models.UserUpdate) (*models.User, error)
	Delete(ctx context.Context, id string) error
}

type Service interface {
	Register(ctx context.Context, u *models.User) (*models.User, error)
	FindByID(ctx context.Context, id string) (*models.User, error)
	FindByEmail(ctx context.Context, email string) (*models.User, error)
	GetAllUsers(ctx context.Context) (*[]models.User, error)
	UpdateUserProfile(ctx context.Context, id string, u *models.UserUpdate) (*models.User, error)
	RemoveAccount(ctx context.Context, id string) error
}

type Handler interface {
	CreateUser() gin.HandlerFunc
	GetUserByID() gin.HandlerFunc
	GetUserByEmail() gin.HandlerFunc
	GetAllUsers() gin.HandlerFunc
	UpdateUser() gin.HandlerFunc
	DeleteUser() gin.HandlerFunc
}
