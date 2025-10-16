package config

import (
	"github.com/0xlebogang/envy/utils"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type GormOpener struct{}

type DBConn interface {
	Open(dialector gorm.Dialector, config *gorm.Config) (*gorm.DB, error)
	Close(db *gorm.DB) error // Remove onError parameter from interface
}

func (g GormOpener) Open(dialector gorm.Dialector, config *gorm.Config) (*gorm.DB, error) {
	return gorm.Open(dialector, config)
}

func (g GormOpener) Close(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}

func CreateDBConnection(dbUrl string, opener DBConn, onError utils.OnErrorCallback) *gorm.DB {
	db, err := opener.Open(postgres.Open(dbUrl), &gorm.Config{})
	if onError != nil {
		onError(err, "Failed to connect to database")
	}
	if err != nil {
		return nil
	}
	return db
}

func CloseDBConnection(db *gorm.DB, opener DBConn, onError utils.OnErrorCallback) {
	err := opener.Close(db)
	if onError != nil {
		onError(err, "Failed to close database connection")
	}
}
