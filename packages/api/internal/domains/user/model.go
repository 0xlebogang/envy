package user

import "github.com/0xlebogang/sekrets/internal/domains/common"

type UserModel struct {
	common.BaseModel
	Email    string  `json:"email" gorm:"uniqueIndex;not null;type:varchar(255)" validate:"required,email,min=5,max=255"`
	Name     string  `json:"name" gorm:"type:varchar(150);not null" validate:"required,min=2,max=150"`
	Avatar   *string `json:"avatar" gorm:"type:text" validate:"omitempty,url"`
	Password *string `json:"password" gorm:"type:text" validate:"omitempty,min=6"`
}

type UserUpdate struct {
	Email    *string `json:"email" validate:"omitempty,email,min=5,max=255"`
	Name     *string `json:"name" validate:"omitempty,min=2,max=150"`
	Avatar   *string `json:"avatar" validate:"omitempty,url"`
	Password *string `json:"password" validate:"omitempty,min=6"`
}

func (u *UserModel) Result() *UserModel {
	return &UserModel{
		BaseModel: u.BaseModel,
		Email:     u.Email,
		Name:      u.Name,
		Avatar:    u.Avatar,
	}
}
