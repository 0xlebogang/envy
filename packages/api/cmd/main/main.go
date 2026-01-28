package main

import (
	"log"

	"github.com/0xlebogang/envy/api/internal/config"
	"github.com/0xlebogang/envy/api/internal/database"
	"github.com/0xlebogang/envy/api/internal/server"
)

func main() {
	cfg := config.LoadEnv()

	db, err := database.Connect(cfg.DatabaseUrl)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close(db)

	svr := server.New(cfg, db)
	if err := svr.Start(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
