package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port               string
	DbURL              string
	CORSAllowedOrigins string
}

type EnvGetter func(key, fallback string) string

func GetEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func LoadEnv() *Config {
	return LoadEnvWithGetter(GetEnv)
}

func LoadEnvWithGetter(getEnv EnvGetter) *Config {
	_ = godotenv.Load()

	return &Config{
		Port:               getEnv("PORT", "8080"),
		DbURL:              getEnv("DATABASE_URL", "postgresql://root:password@localhost:5433/postgres"),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3001,http://127.0.0.1:3001"),
	}
}
