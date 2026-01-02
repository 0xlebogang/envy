package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	cfg    *config.Config
	db     *gorm.DB
	router *gin.Engine
}

func New(cfg *config.Config, db *gorm.DB) *Server {
	return &Server{
		cfg:    cfg,
		db:     db,
		router: gin.Default(),
	}
}

func (s *Server) Start() error {
	healthCheck(s.router)

	svr := s.createHTTPServer()

	return svr.ListenAndServe()
}

func (s *Server) createHTTPServer() *http.Server {
	return &http.Server{
		Addr:    fmt.Sprintf(":%s", s.cfg.Port),
		Handler: s.router.Handler(),
	}
}

func healthCheck(ctx *gin.Engine) {
	ctx.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"time":   time.Now().Format(time.RFC1123),
		})
	})
}
