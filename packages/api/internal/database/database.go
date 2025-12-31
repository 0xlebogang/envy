package database

import (
	"database/sql"

	"gorm.io/gorm"
)

type IDatabase interface {
	DB() (*sql.DB, error)
}

type IDbDriver interface {
	Open(dsn string) gorm.Dialector
}

func Connect(driver gorm.Dialector) (*gorm.DB, error) {
	db, err := gorm.Open(driver, &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}

func Close(db IDatabase) {
	if dbSQL, err := db.DB(); err == nil {
		if err := dbSQL.Close(); err != nil {
			panic(err)
		}
	}
}
