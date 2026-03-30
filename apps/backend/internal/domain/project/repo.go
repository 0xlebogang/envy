package project

import (
	"context"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"gorm.io/gorm"
)

type repo struct {
	db *gorm.DB
}

type UserIDKey struct{}

func NewRepo(db *gorm.DB) Repository {
	return &repo{db: db}
}

func (r *repo) Create(ctx context.Context, p *models.Project) (*models.Project, error) {
	userID, err := r.getUserID(ctx)
	if err != nil {
		return nil, err
	}

	p.UserID = userID

	err = r.db.WithContext(ctx).Create(p).Error
	if err != nil {
		return nil, err
	}
	return p, nil
}

func (r *repo) List(ctx context.Context) (*[]models.Project, error) {
	var projects []models.Project
	userID, err := r.getUserID(ctx)
	if err != nil {
		return nil, err
	}

	err = r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		Find(&projects).Error
	if err != nil {
		return nil, err
	}
	return &projects, nil
}

func (r *repo) GetByID(ctx context.Context, projectID string) (*models.Project, error) {
	var project models.Project
	userID, err := r.getUserID(ctx)
	if err != nil {
		return nil, err
	}

	err = r.db.WithContext(ctx).
		Where("id = ? AND user_id = ?", projectID, userID).
		First(&project).Error
	if err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *repo) Update(ctx context.Context, projectID string, p *models.ProjectUpdate) (*models.Project, error) {
	project, err := r.GetByID(ctx, projectID)
	if err != nil {
		return nil, err
	}

	err = r.db.WithContext(ctx).
		Model(project).
		Where("id = ? AND user_id = ?", project.ID, project.UserID).
		Updates(p).Error
	if err != nil {
		return nil, err
	}

	if err := r.db.WithContext(ctx).First(project).Error; err != nil {
		return nil, err
	}

	return project, nil
}

func (r *repo) Delete(ctx context.Context, projectID string) error {
	project, err := r.GetByID(ctx, projectID)
	if err != nil {
		return err
	}
	if err := r.db.WithContext(ctx).Delete(project).Error; err != nil {
		return err
	}
	return nil
}

func (r *repo) getUserID(ctx context.Context) (string, error) {
	if ctx.Value(UserIDKey{}) == "" {
		return "", ErrNoUserID
	}
	return ctx.Value(UserIDKey{}).(string), nil
}
