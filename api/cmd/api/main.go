package main

import (
	"log"

	"github.com/0xlebogang/sekrets/internal/server"
)

func main() {
	s := server.New("8080")
	if err := s.Start(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
