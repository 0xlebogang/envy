package main

import (
	"log"

	"github.com/0xlebogang/envy/backend/internal/config"
	"github.com/0xlebogang/envy/backend/internal/database"
	"github.com/0xlebogang/envy/backend/internal/domain/models"
)

var tables = []interface{}{
	models.User{},
	models.Project{},
	models.Environment{},
	models.Secret{},
}

func main() {
	dbUrl := config.Load().DatabaseUrl
	db := database.New(dbUrl)
	conn, err := db.Connect()
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer db.Close()

	if err := conn.AutoMigrate(tables...); err != nil {
		log.Fatalf("failed to migrate tables: %v", err)
	}
}
