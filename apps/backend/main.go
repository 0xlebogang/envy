package main

import (
	"context"
	"time"

	"github.com/0xlebogang/envy/internal/config"
)

func main() {
	conf := config.LoadEnv()

	server := config.NewServer(conf)
	server.RegisterRoutes()
	server.Start()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer server.Shutdown(ctx)
	defer cancel()
}
