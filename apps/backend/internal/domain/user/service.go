package user

import (
	"context"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
)

type svc struct {
	repo Repository
}

func NewSvc(repo Repository) Service {
	return svc{repo}
}

func (s svc) Register(ctx context.Context, u *models.User) (*models.User, error) {
	return s.repo.Create(ctx, u)
}

func (s svc) FindByID(ctx context.Context, id string) (*models.User, error) {
	return s.repo.GetByID(ctx, id)
}

func (s svc) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	return s.repo.GetByEmail(ctx, email)
}

func (s svc) GetAllUsers(ctx context.Context) (*[]models.User, error) {
	return s.repo.List(ctx)
}

func (s svc) UpdateUserProfile(ctx context.Context, id string, u *models.User) (*models.User, error) {
	return s.repo.Update(ctx, id, u)
}

func (s svc) RemoveAccount(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
