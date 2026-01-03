package common

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestBeforeCreate(t *testing.T) {
	baseModel := &BaseModel{}
	err := baseModel.BeforeCreate(&gorm.DB{})

	assert.NoError(t, err)
	assert.NotEmpty(t, baseModel.ID, "ID should be set to the generated ID")
}

func TestGenerateID(t *testing.T) {
	baseModel := &BaseModel{}
	id := baseModel.generateID()

	assert.NotEmpty(t, id, "Generated ID should not be empty")
	assert.Equal(t, 21, len(id), "Generated ID should have a length of 21 characters")
}

func TestBeforeCreate_Idempotency(t *testing.T) {
	firstBaseModel := &BaseModel{}
	err := firstBaseModel.BeforeCreate(&gorm.DB{})
	assert.NoError(t, err)
	firstID := firstBaseModel.ID

	// Simulate another call
	secondBaseModel := &BaseModel{}
	err = secondBaseModel.BeforeCreate(&gorm.DB{})
	secondID := secondBaseModel.ID

	assert.NoError(t, err)
	assert.NotEqual(t, firstID, secondID, "ID should be different for different instances")
}
