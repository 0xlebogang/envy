package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Database struct {
	connectionString string
	activeConnection *gorm.DB
}

func New(connectionString string) *Database {
	return &Database{
		connectionString: connectionString,
		activeConnection: nil,
	}
}

func (d *Database) Connect() (*gorm.DB, error) {
	dialector := postgres.Open(d.connectionString)
	if conn, err := gorm.Open(dialector); err != nil {
		return nil, err
	} else {
		d.activeConnection = conn
		return conn, nil
	}
}

func (d *Database) Close() {
	if d.activeConnection == nil {
		log.Println("No active database connection to close")
		return
	}

	sqlDB, err := d.activeConnection.DB()
	if err != nil {
		log.Printf("Failed to get active database connection: %v", err)
		return
	}

	if err := sqlDB.Close(); err != nil {
		log.Printf("Failed to close active database connection: %v", err)
		return
	}

	d.activeConnection = nil
}
