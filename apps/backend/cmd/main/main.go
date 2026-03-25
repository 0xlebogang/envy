package main

import (
	"log"

	"github.com/0xlebogang/envy/backend/internal/config"
	"github.com/0xlebogang/envy/backend/internal/database"
	"github.com/0xlebogang/envy/backend/internal/server"
)

func main() {
	cfg := config.Load()

	db := database.New(cfg.DatabaseUrl)
	conn, err := db.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	svr := server.New(cfg, conn)
	if err := svr.Run(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
