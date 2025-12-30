package main

import (
	"log"

	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/server"
)

func main() {
	cfg := config.LoadEnv()

	s := server.New(cfg.Port)
	if err := s.Start(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
