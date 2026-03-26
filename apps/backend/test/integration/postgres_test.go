package integration

import (
	"testing"

	"github.com/0xlebogang/envy/backend/internal/database"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func createDBConnection(cs string) (*gorm.DB, error) {
	db := database.New(cs)
	return db.Connect()
}

func TestConnect(t *testing.T) {
	conn, err := createDBConnection("postgresql://postgres:postgres@localhost:5432/postgres")
	assert.NoError(t, err)
	assert.NotNil(t, conn)
}
