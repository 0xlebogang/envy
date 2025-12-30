package server

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/0xlebogang/sekrets/internal/auth"
	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/0xlebogang/sekrets/internal/handlers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type IServer interface {
	Start() error
	NewServer() *Server
}

type Server struct {
	Config config.Config
	DB     *gorm.DB
}

func New(db *gorm.DB, cfg *config.Config) *Server {
	return &Server{Config: *cfg, DB: db}
}

func (s *Server) Start(ctx context.Context) error {
	r := gin.Default()

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

	authHandlers := handlers.New(authClient, &s.Config)

	r.GET("/api/auth/login", authHandlers.LoginHandler())
	r.GET("/api/auth/callback", authHandlers.CallbackHandler())
	r.POST("/api/auth/logout", authHandlers.LogoutHandler())
	// r.GET("/api/me", authHandlers.MeHandler())

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
