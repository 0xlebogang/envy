package server

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/0xlebogang/sekrets/internal/auth"
	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/handlers"
	"github.com/0xlebogang/sekrets/internal/routes"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type IServer interface {
	Start() error
	NewServer() *Server
}

type Server struct {
	Config *config.Config
	DB     *gorm.DB
}

func New(db *gorm.DB, cfg *config.Config) *Server {
	return &Server{Config: cfg, DB: db}
}

func (s *Server) Start(ctx context.Context) error {
	gin := gin.Default()
	r := gin.Group("/api")

	authClient, err := auth.New(ctx, &auth.AuthClientConfig{
		Issuer:         s.Config.OIDCIssuer,
		ClientId:       s.Config.OIDCClientId,
		ClientSecret:   s.Config.OIDCClientSecret,
		RedirectURL:    s.Config.OIDCRedirectUrl,
		Scopes:         s.Config.OIDCScopes,
		AuthCookieName: s.Config.AuthCookieName,
	})
	if err != nil {
		return fmt.Errorf("Failed to create auth client: %w", err)
	}

	authHandlers := handlers.New(authClient, s.Config)
	routes.New(authHandlers).Register(r)

	// Health check endpoint
	gin.GET("/health", HealthCheckHandler())

	svr := &http.Server{
		Addr:    fmt.Sprintf(":%s", s.Config.Port),
		Handler: gin.Handler(),
	}

	return svr.ListenAndServe()
}

func HealthCheckHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message":   "API is healthy",
			"success":   true,
			"timestamp": fmt.Sprintf("%s", time.Now().Format(time.RFC1123)),
		})
	}
}
