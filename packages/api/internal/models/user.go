package models

type User struct {
	BaseModel
	Email        string  `json:"email" gorm:"uniqueIndex;not null;type:varchar(150)" validate:"required,email"`
	Name         string  `json:"name" gorm:"type:varchar(100);not null" validate:"required"`
	PasswordHash *string `json:"-" gorm:"type:varchar(255);not null"`
	Avatar       *string `json:"avatar" gorm:"type:text" validate:"omitempty,url"`
}

type UserUpdate struct {
	Name         *string `json:"name" validate:"omitempty"`
	Avatar       *string `json:"avatar" validate:"omitempty,url"`
	PasswordHash *string `json:"password_hash" validate:"omitempty"`
}
