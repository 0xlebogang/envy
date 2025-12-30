package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/0xlebogang/sekrets/internal/auth"
	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/database"
	"github.com/gin-gonic/gin"
)

type IServer interface {
	Start() error
	NewServer() *Server
}

type Server struct {
	Config config.Config
}

func New(cfg *config.Config) *Server {
	return &Server{Config: *cfg}
}

func (s *Server) Start(ctx context.Context) error {
	r := gin.Default()

	db, err := database.Connection(s.Config.DatabaseUrl)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close(db)

	authClient, err := auth.New(ctx, &auth.AuthClientConfig{
		Issuer:       s.Config.OIDCIssuer,
		ClientId:     s.Config.OIDCClientId,
		ClientSecret: s.Config.OIDCClientSecret,
		RedirectURL:  s.Config.OIDCRedirectUrl,
		Scopes:       s.Config.OIDCScopes,
	})
	if err != nil {
		return fmt.Errorf("Failed to create auth client: %w", err)
	}
	_ = authClient // to avoid unused variable error for now

	// Health check endpoint
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message":   "pong",
			"success":   true,
			"timestamp": fmt.Sprintf("%s", time.Now().Format(time.RFC1123)),
		})
	})

	svr := &http.Server{
		Addr:    fmt.Sprintf(":%s", s.Config.Port),
		Handler: r.Handler(),
	}

	return svr.ListenAndServe()
}
