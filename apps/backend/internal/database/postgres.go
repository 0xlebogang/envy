package database

import (
	"fmt"
	"log"
	"strings"

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
	dbProvider := strings.Split(d.connectionString, ":")
	switch dbProvider[0] {
	case "postgres":
	case "postgresql":
		dialector := d.getPostgresDialector()
		conn, err := gorm.Open(dialector, &gorm.Config{})
		if err != nil {
			return nil, err
		}
		d.activeConnection = conn
		return conn, nil

	//	Add case for other supported databases

	default:
		return nil, fmt.Errorf("unsupported database driver: %s", dbProvider[0])
	}

	return nil, nil
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

func (d *Database) getPostgresDialector() gorm.Dialector {
	return postgres.Open(d.connectionString)
}

// Implmement dialector getters for other possibly supported databases
