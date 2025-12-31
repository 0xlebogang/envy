package models

import (
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
)

type BaseModel struct {
	ID        string    `json:"id" gorm:"primaryKey;type:varchar(21);<-:create"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime;<-:create"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime;<-:create"`
}

func (b *BaseModel) BeforeCreate(tx *gorm.DB) (err error) {
	if b.ID == "" {
		b.ID = generateID()
	}
	return
}

func generateID() string {
	id, _ := gonanoid.New(21)
	return id
}
