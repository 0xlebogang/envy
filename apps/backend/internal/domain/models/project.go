package models

type Project struct {
	BaseModel   BaseModel `gorm:"embedded"`
	UserID      string    `json:"user_id"`
	Name        string    `json:"name" gorm:"type:varchar(50);not null" binding:"required,min=2,max=50"`
	Description *string   `json:"description" gorm:"type:text;default:null" binding:"omitempty,min=2"`
}
