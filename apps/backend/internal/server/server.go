package server

import (
	"fmt"
	"net/http"

	"github.com/0xlebogang/envy/backend/internal/config"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type server struct {
	config *config.Config
	db     *gorm.DB
	router *gin.Engine
}

func New(c *config.Config, db *gorm.DB) Server {
	return &server{
		config: c,
		db:     db,
		router: gin.Default(),
	}
}

func (s *server) Run() error {
	r := s.router

	// non-versioned endpoints
	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok", // temporary health check endpoint
		})
	})

	s.setupRoutes()

	svr := s.createHttpServer()
	return svr.ListenAndServe()
}

func (s *server) createHttpServer() *http.Server {
	return &http.Server{
		Addr:    fmt.Sprintf(":%s", s.config.Port),
		Handler: s.router.Handler(),
	}
}
