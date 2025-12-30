package main

import (
	"context"
	"log"

	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/server"
)

func main() {
	ctx := context.Background()
	cfg := config.LoadEnv()

	s := server.New(cfg)
	if err := s.Start(ctx); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
