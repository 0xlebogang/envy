package models

type Environment struct {
	BaseModel
	ProjectID   string  `json:"project_id"`
	Name        string  `json:"environment" gorm:"type:varchar(50);not null" binding:"min=2,max=50"`
	Description *string `json:"description" gorm:"type:text;default:null" binding:"omitempty,min=2,max=250"`
	Secrets     []Secret
}
