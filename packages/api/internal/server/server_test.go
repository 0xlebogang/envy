package server

import (
	"fmt"
	"testing"

	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateHTTPServer(t *testing.T) {
	tests := []struct {
		name         string
		cfg          *config.Config
		db           *gorm.DB
		expectedPort string
	}{
		{
			name: "should create a new HTTP server with correct dependencies",
			cfg: &config.Config{
				Port: "1234",
			},
			db:           &gorm.DB{},
			expectedPort: "1234",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			server := New(tt.cfg, tt.db)
			httpServer := server.createHTTPServer()

			assert.Equal(t, fmt.Sprintf(":%s", tt.expectedPort), httpServer.Addr)
			assert.NotNil(t, httpServer.Handler)
		})
	}
}
