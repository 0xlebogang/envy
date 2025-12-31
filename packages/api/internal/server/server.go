package server

type IServer interface {
	Start() error
}

type Server struct {
}

func New() *Server {
	return &Server{}
}

func (s *Server) Start() error {
	return nil
}
