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
	Port             string
	DatabaseUrl      string
	OIDCIssuer       string
	OIDCClientId     string
	OIDCClientSecret string
	OIDCRedirectUrl  string
	OIDCScopes       []string
}

func LoadEnv() *Config {
	_ = godotenv.Load()

	return &Config{
		Port:             GetEnv("PORT", "8000"),
		DatabaseUrl:      GetEnv("DATABASE_URL", "postgresql://root:password@localhost:5432/postgres"),
		OIDCIssuer:       GetEnv("OIDC_ISSUER", "https://localhost:8080"),
		OIDCClientId:     GetEnv("OIDC_CLIENT_ID", ""),
		OIDCClientSecret: GetEnv("OIDC_CLIENT_SECRET", ""),
		OIDCRedirectUrl:  GetEnv("OIDC_REDIRECT_URL", "http://localhost:/auth/callback"),
		OIDCScopes:       []string{"openid", "profile", "email"},
	}
}

func GetEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
