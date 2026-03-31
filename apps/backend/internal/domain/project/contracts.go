package project

import (
	"context"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
)

type Repository interface {
	Create(ctx context.Context, p *models.Project) (*models.Project, error)
	List(ctx context.Context) (*[]models.Project, error)
	GetByID(ctx context.Context, projectID string) (*models.Project, error)
	Update(ctx context.Context, projectID string, p *models.ProjectUpdate) (*models.Project, error)
	Delete(ctx context.Context, projectID string) error
}
