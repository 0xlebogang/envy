package user

import (
	"context"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
)

type Repository interface {
	Create(ctx context.Context, u *models.User) (*models.User, error)
	GetByID(ctx context.Context, id string) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	List(ctx context.Context) (*[]models.User, error)
	Update(ctx context.Context, id string, u *models.User) (*models.User, error)
	Delete(ctx context.Context, id string) error
}
