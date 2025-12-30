package main

import (
	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/database"
)

func main() {
	cfg := config.LoadEnv()
	db, err := database.Connection(cfg.DatabaseUrl)
	if err != nil {
		panic(err)
	}
	defer database.Close(db)

	// err = database.RunMigrations(db /* models go here */)
	// if err != nil {
	// 	panic(err)
	// }
}
