package user

import "github.com/0xlebogang/sekrets/internal/domains/common"

type UserModel struct {
	common.BaseModel
	Email    string  `json:"email" gorm:"uniqueIndex;not null" validate:"required,email"`
	Name     string  `json:"name" gorm:"not null" validate:"required,min=2,max=100"`
	Avatar   *string `json:"avatar" gorm:"text" validate:"omitempty,url"`
	Password *string `json:"password" gorm:"text" validate:"omitempty,min=6,max=100"`
}

type UserUpdateInput struct {
	Email    *string `json:"email" validate:"omitempty,email"`
	Name     *string `json:"name" validate:"omitempty,min=2,max=100"`
	Avatar   *string `json:"avatar" validate:"omitempty,url"`
	Password *string `json:"password" validate:"omitempty,min=6,max=100"`
}

func (u *UserModel) TableName() string {
	return "users"
}

func (u *UserModel) Result() *UserModel {
	return &UserModel{
		BaseModel: u.BaseModel,
		Email:     u.Email,
		Name:      u.Name,
		Avatar:    u.Avatar,
	}
}
