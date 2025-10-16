package main

import (
	"log"

	"github.com/0xlebogang/envy/internal/config"
)

func main() {
	conf := config.LoadEnv()

	server := config.NewServer(conf)
	server.RegisterRoutes()

	if err := server.Start(); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
