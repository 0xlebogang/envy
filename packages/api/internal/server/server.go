package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/0xlebogang/envy/api/internal/config"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	cfg    *config.Env
	db     *gorm.DB
	router *gin.Engine
}

func New(cfg *config.Env, db *gorm.DB) *Server {
	return &Server{
		cfg:    cfg,
		db:     db,
		router: gin.Default(),
	}
}

func (s *Server) Start() error {
	s.attachHealthCheckEndpoint()
	svr := s.createHttpServer()
	return svr.ListenAndServe()
}

func (s *Server) createHttpServer() *http.Server {
	return &http.Server{
		Addr:    fmt.Sprintf(":%s", s.cfg.Port),
		Handler: s.router.Handler(),
	}
}

func (s *Server) attachHealthCheckEndpoint() {
	s.router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
			"time":   time.Now().Format(time.RFC1123),
		})
	})
}
