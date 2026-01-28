package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(connectionString string) (*gorm.DB, error) {
	dialector := postgres.Open(connectionString)
	db, err := gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}

func Close(db *gorm.DB) {
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get active database connection: %v", err)
	}
	if err := sqlDB.Close(); err != nil {
		log.Fatalf("Failed to close database connection: %v", err)
	}
}
