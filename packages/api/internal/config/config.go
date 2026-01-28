package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	Port        string
	DatabaseUrl string
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func LoadEnv() *Env {
	_ = godotenv.Load()
	return &Env{
		Port:        getEnv("PORT", "8080"),
		DatabaseUrl: getEnv("DATABASE_URL", "postgresql://root:password@localhost:5432/postgres"),
	}
}
