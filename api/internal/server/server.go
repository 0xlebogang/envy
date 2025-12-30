package server

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IServer interface {
	Start() error
	NewServer() *Server
}

type Server struct {
	Port string
}

func New(port string) *Server {
	return &Server{Port: port}
}

func (s *Server) Start() error {
	r := gin.Default()
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	svr := &http.Server{
		Addr:    fmt.Sprintf(":%s", s.Port),
		Handler: r.Handler(),
	}

	return svr.ListenAndServe()
}
