package integration

import (
	"os"
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
	dbUrl := os.Getenv("DATABASE_URL")
	conn, err := createDBConnection(dbUrl)
	assert.NoError(t, err)
	assert.NotNil(t, conn)
}
