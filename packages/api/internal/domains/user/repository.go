package user

import "gorm.io/gorm"

type IUserRepository interface {
	CreateUser(user *UserModel) error
	GetUser(id string) (*UserModel, error)
	UpdateUser(user *UserModel) error
	DeleteUser(id string) error
}

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) CreateUser(user *UserModel) error {
	return r.db.Create(user).Error
}

func (r *Repository) GetUser(id string) (*UserModel, error) {
	var user UserModel
	if err := r.db.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *Repository) UpdateUser(id string, updateData *UserUpdateInput) (*UserModel, error) {
	user, err := r.GetUser(id)
	if err != nil {
		return nil, err
	}
	if err := r.db.Model(user).Updates(updateData).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (r *Repository) DeleteUser(id string) error {
	user, err := r.GetUser(id)
	if err != nil {
		return err
	}
	return r.db.Delete(user).Error
}
