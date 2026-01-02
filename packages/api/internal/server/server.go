package server

import (
	"fmt"
	"net/http"

	"github.com/0xlebogang/sekrets/internal/api/handlers"
	"github.com/0xlebogang/sekrets/internal/api/routes"
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
	svr := s.createHTTPServer()

	systemHandlers := handlers.NewSystemHandlers()
	routes.New(systemHandlers).Register(s.router)

	return svr.ListenAndServe()
}

func (s *Server) createHTTPServer() *http.Server {
	return &http.Server{
		Addr:    fmt.Sprintf(":%s", s.cfg.Port),
		Handler: s.router.Handler(),
	}
}
