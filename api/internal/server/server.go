package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type IServer interface {
	Start() error
	NewServer() *Server
}

type Server struct {
	Port string
	DB   *gorm.DB
}

func New(db *gorm.DB, port string) *Server {
	return &Server{Port: port, DB: db}
}

func (s *Server) Start() error {
	r := gin.Default()

	// Health check endpoint
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message":   "pong",
			"success":   true,
			"timestamp": fmt.Sprintf("%s", time.Now().Format(time.RFC1123)),
		})
	})

	svr := &http.Server{
		Addr:    fmt.Sprintf(":%s", s.Port),
		Handler: r.Handler(),
	}

	return svr.ListenAndServe()
}
