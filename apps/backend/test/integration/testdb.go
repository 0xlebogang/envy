package integration

import (
	"os"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/domain/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var tables = []interface{}{
	models.User{},
	models.Project{},
	models.Environment{},
	models.Secret{},
}

func setupTestDB(t *testing.T) *gorm.DB {
	t.Helper()

	dbUrl := os.Getenv("DATABASE_URL")

	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		t.Fatalf("failed to connect to test DB: %v", err)
	}

	if err := db.AutoMigrate(tables...); err != nil {
		t.Fatalf("failed to migrate test DB: %v", err)
	}

	return db
}
