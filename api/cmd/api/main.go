package main

import (
	"context"
	"log"

	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/database"
	"github.com/0xlebogang/sekrets/internal/server"
)

func main() {
	ctx := context.Background()
	cfg := config.LoadEnv()

	db, err := database.Connection(cfg.DatabaseUrl)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close(db)

	s := server.New(db, cfg)
	if err := s.Start(ctx); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
