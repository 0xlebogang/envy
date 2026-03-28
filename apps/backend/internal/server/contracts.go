package server

import (
	"net/http"
)

type Server interface {
	createHttpServer() *http.Server
	Run() error
}
