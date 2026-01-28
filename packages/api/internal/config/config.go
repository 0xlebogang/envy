package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	Port                          string
	DatabaseUrl                   string
	ZitadelAPIPersonalAccessToken string
	ZitadelDomain                 string
	ZitadelKey                    string
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
		Port:                          getEnv("PORT", "8080"),
		DatabaseUrl:                   getEnv("DATABASE_URL", "postgresql://root:password@localhost:5432/postgres"),
		ZitadelDomain:                 getEnv("ZITADEL_DOMAIN", "https://envy.zitadel.ch"),
		ZitadelKey:                    getEnv("ZITADEL_KEYFILE_PATH", "./key.json"),
		ZitadelAPIPersonalAccessToken: getEnv("ZITADEL_API_PERSONAL_ACCESS_TOKEN", ""),
	}
}
