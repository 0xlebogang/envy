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
	Port string
}

func LoadEnv() *Config {
	_ = godotenv.Load()

	return &Config{
		Port: GetEnv("PORT", "8080"),
	}
}

func GetEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
