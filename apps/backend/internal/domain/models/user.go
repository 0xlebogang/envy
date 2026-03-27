package models

import (
	"time"
)

type User struct {
	BaseModel BaseModel `gorm:"embedded"`
	Email     string    `json:"email" gorm:"uniqueIndex;type:varchar(255);not null" binding:"required,email,min=2,max=255"`
	Password  *string   `json:"password,omitempty" gorm:"type:text;default:null" binding:"omitempty,min=6,max=20"`
	Name      *string   `json:"name,omitempty" gorm:"type:varchar(50);default:null" binding:"omitempty,min=2,max=255"`
	Provider  string    `json:"provider" gorm:"type:varchar(50);default:internal" binding:"omitempty,min=2,max=50"`
	Projects  []Project
}

type UserResponse struct {
	ID        string     `json:"id"`
	Email     string     `json:"email"`
	Name      *string    `json:"name"`
	Provider  string     `json:"provider"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
}

func (u *User) Response() *UserResponse {
	return &UserResponse{
		ID:        u.BaseModel.ID,
		Email:     u.Email,
		Name:      u.Name,
		Provider:  u.Provider,
		CreatedAt: u.BaseModel.CreatedAt,
		UpdatedAt: u.BaseModel.UpdatedAt,
	}
}
