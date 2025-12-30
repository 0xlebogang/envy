package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type IDatabaseConfig interface {
	New() (*gorm.DB, error)
	RunMigrations(db *gorm.DB, models ...interface{}) error
	Close() error
}

type DbConfig struct {
	DatabaseUrl string
}

func (db *DbConfig) RunMigrations(database *gorm.DB, models ...interface{}) error {
	return database.AutoMigrate(models...)
}

func Connection(databaseUrl string) (*gorm.DB, error) {
	driver := postgres.Open(databaseUrl)
	return gorm.Open(driver, &gorm.Config{})
}

func Close(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
