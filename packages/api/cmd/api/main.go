package main

import (
	"log"

	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/database"
	"github.com/0xlebogang/sekrets/internal/server"
	"gorm.io/driver/postgres"
)

func main() {
	cfg := config.Load()
	dbDriver := postgres.Open(cfg.DatabaseUrl)
	db, err := database.Connect(dbDriver)
	if err != nil {
		log.Fatalf("Failed to connect to database")
	}
	defer database.Close(db)

	svr := server.New(cfg, db)
	if err := svr.Start(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
