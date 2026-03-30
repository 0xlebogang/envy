package models

type Project struct {
	BaseModel
	UserID       string  `json:"user_id"`
	Name         string  `json:"name" gorm:"type:varchar(50);not null" binding:"required,min=2,max=50"`
	Description  *string `json:"description" gorm:"type:text;default:null" binding:"omitempty,min=2"`
	Environments []Environment
}

type ProjectUpdate struct {
	Name        *string `json:"name,omitempty" gorm:"type:varchar(50);not null" binding:"omitempty,min=2,max=50"`
	Description *string `json:"description,omitempty" gorm:"type:text;default:null" binding:"omitempty,min=2"`
}
