package config

import (
	"os"

	"github.com/joho/godotenv"
)

type IConfig interface {
	GetEnv() string
	LoadEnv() *Config
}

type Config struct {
	Port        string
	DatabaseUrl string
}

func LoadEnv() *Config {
	_ = godotenv.Load()

	return &Config{
		Port:        GetEnv("PORT", "8080"),
		DatabaseUrl: GetEnv("DATABASE_URL", "postgresql://root:password@localhost:5432/postgres"),
	}
}

func GetEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
