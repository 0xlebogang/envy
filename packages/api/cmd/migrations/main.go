package main

import (
	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/database"
	"github.com/0xlebogang/sekrets/internal/models"
	"gorm.io/driver/postgres"
)

func main() {
	connectionString := config.Load().DatabaseUrl
	db, err := database.Connect(postgres.Open(connectionString))
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		panic(err)
	}
}
