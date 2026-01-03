package user

import "gorm.io/gorm"

type IDb interface {
	Create(value interface{}) *gorm.DB
	Find(dest interface{}, conds ...interface{}) *gorm.DB
	First(dest interface{}, conds ...interface{}) *gorm.DB
	Model(value interface{}) *gorm.DB
	Updates(values interface{}) *gorm.DB
	Delete(value interface{}, conds ...interface{}) *gorm.DB
}

type Repository struct {
	db IDb
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(user *UserModel) (*UserModel, error) {
	err := r.db.Create(user).Error
	return user, err
}

func (r *Repository) GetAll() (*[]UserModel, error) {
	var users *[]UserModel
	err := r.db.Find(&users).Error
	return users, err
}

func (r *Repository) GetByID(id string) (*UserModel, error) {
	var user UserModel
	err := r.db.First(&user, id).Error
	return &user, err
}

func (r *Repository) Update(id string, updates *UserUpdate) (*UserModel, error) {
	user, err := r.GetByID(id)
	if err != nil {
		return nil, err
	}
	if err := r.db.Model(user).Updates(updates).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (r *Repository) Delete(id string) error {
	return r.db.Delete(&UserModel{}, id).Error
}
