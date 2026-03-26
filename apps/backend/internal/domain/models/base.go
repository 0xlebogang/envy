package models

import (
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"gorm.io/gorm"
)

type BaseModel struct {
	ID        string     `json:"id" gorm:"primaryKey;type:string"`
	CreatedAt time.Time  `json:"created_at" gorm:"autoCreateTime;not null;<-:create"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"autoUpdateTime;default:null;<-:update"`
}

func (b *BaseModel) BeforeCreate(tx *gorm.DB) error {
	if b.ID == "" {
		nanoid, err := gonanoid.New(21)
		if err != nil {
			return err
		}
		b.ID = nanoid
	}
	return nil
}

func (b *BaseModel) BeforeUpdate(tx *gorm.DB) error {
	tx.Statement.Omit("id", "created_at")
	return nil
}
