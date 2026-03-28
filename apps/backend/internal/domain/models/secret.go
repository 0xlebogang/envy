package models

type Secret struct {
	BaseModel
	EnvironmentID string `json:"environment_id"`
	Key           string `json:"key" gorm:"type:varchar(150);not null" binding:"required,min=1,max=150"`
	Value         string `json:"value" gorm:"type:text;not null" binding:"required,min=1"`
}
