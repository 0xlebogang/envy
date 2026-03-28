package server

import "github.com/0xlebogang/envy/backend/internal/domain/user"

func (s *server) setupRoutes() {
	api := s.router.Group("/api")

	// Version groups
	v1 := api.Group("/v1")

	// Build modules
	userModule := user.BuildModule(s.db)

	// Register module routes
	userModule.RegisterRoutes(v1)
}
