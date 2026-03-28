package user

import (
	"context"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"github.com/0xlebogang/envy/backend/internal/utils"
	"gorm.io/gorm"
)

type repo struct {
	db *gorm.DB
}

func NewRepo(db *gorm.DB) Repository {
	return repo{db: db}
}

func (r repo) Create(ctx context.Context, u *models.User) (*models.User, error) {
	err := r.db.WithContext(ctx).Create(u).Error
	if err != nil {
		if utils.IsUniqueViolation(err) {
			return nil, gorm.ErrDuplicatedKey
		}
		return nil, err
	}
	return u, nil
}

func (r repo) GetByID(ctx context.Context, id string) (*models.User, error) {
	var user models.User
	err := r.db.WithContext(ctx).First(&user, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r repo) GetByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	err := r.db.WithContext(ctx).First(&user, "email = ?", email).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r repo) List(ctx context.Context) (*[]models.User, error) {
	var users []models.User
	err := r.db.WithContext(ctx).Find(&users).Error
	if err != nil {
		return nil, err
	}
	return &users, nil
}

func (r repo) Update(ctx context.Context, id string, u *models.UserUpdate) (*models.User, error) {
	user, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	err = r.db.WithContext(ctx).Model(user).Where("id = ?", id).Updates(u).Error
	if err != nil {
		if utils.IsUniqueViolation(err) {
			return nil, gorm.ErrDuplicatedKey
		}
		return nil, err
	}

	if err := r.db.WithContext(ctx).First(user, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (r repo) Delete(ctx context.Context, id string) error {
	user, err := r.GetByID(ctx, id)
	if err != nil {
		return err
	}

	err = r.db.WithContext(ctx).Delete(user).Error
	if err != nil {
		return err
	}
	return nil
}
