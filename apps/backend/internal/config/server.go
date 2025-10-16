package config

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"

	echo "github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type ServerDependencies struct {
	EnvGetter    func(string) string
	SignalNotify func(chan<- os.Signal, ...os.Signal)
}

type Server struct {
	Echo   *echo.Echo
	Config *Config
	deps   *ServerDependencies
}

func NewServer(config *Config) *Server {
	return NewServerWithDeps(config, &ServerDependencies{
		EnvGetter:    os.Getenv,
		SignalNotify: signal.Notify,
	})
}

func NewServerWithDeps(config *Config, deps *ServerDependencies) *Server {
	e := echo.New()

	server := &Server{
		Echo:   e,
		Config: config,
		deps:   deps,
	}

	server.setupMiddleware()
	return server
}

// setupMiddleware configures all middleware
func (s *Server) setupMiddleware() {
	s.Echo.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${time_rfc3339}] ${remote_ip} ${method} ${uri} ${status}\n",
	}))
	s.Echo.Use(middleware.Recover())
	s.Echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: s.GetCORSOrigins(),
	}))
}

// GetCORSOrigins returns CORS origins based on environment
func (s *Server) GetCORSOrigins() []string {
	if s.deps.EnvGetter("ENVIRONMENT") != "production" {
		return []string{"*"}
	}
	return strings.Split(s.Config.CORSAllowedOrigins, ",")
}

// Start starts the server with graceful shutdown
func (s *Server) Start() error {
	return s.StartWithContext(context.Background())
}

// StartWithContext starts the server with a provided context (testable)
func (s *Server) StartWithContext(ctx context.Context) error {
	addr := fmt.Sprintf(":%s", s.Config.Port)

	// Channel for server errors
	serverErr := make(chan error, 1)

	// Start server in a goroutine
	go func() {
		if err := s.Echo.Start(addr); err != nil && err != http.ErrServerClosed {
			serverErr <- err
		}
	}()

	// Wait for interrupt signal or context cancellation
	quit := make(chan os.Signal, 1)
	s.deps.SignalNotify(quit, os.Interrupt)

	select {
	case <-quit:
		// Graceful shutdown
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return s.Echo.Shutdown(shutdownCtx)
	case <-ctx.Done():
		// Context cancelled (useful for testing)
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return s.Echo.Shutdown(shutdownCtx)
	case err := <-serverErr:
		return err
	}
}

// StartWithoutGracefulShutdown starts the server without graceful shutdown
func (s *Server) StartWithoutGracefulShutdown() error {
	return s.Echo.Start(fmt.Sprintf(":%s", s.Config.Port))
}

// RegisterRoutes sets up all routes
func (s *Server) RegisterRoutes() {
	s.registerHealthRoutes()
	s.registerAPIRoutes()
}

// registerHealthRoutes sets up health check routes
func (s *Server) registerHealthRoutes() {
	s.Echo.GET("/health", s.healthHandler)
}

// registerAPIRoutes sets up API routes
func (s *Server) registerAPIRoutes() {
	_ = s.Echo.Group("/v1")
}

// Health check route handler
func (s *Server) healthHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"status":      "ok",
		"server_time": time.Now().String(),
	})
}

// Shutdown gracefully shuts down the server
func (s *Server) Shutdown(ctx context.Context) error {
	return s.Echo.Shutdown(ctx)
}
