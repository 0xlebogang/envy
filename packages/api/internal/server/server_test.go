package server

import (
	"testing"

	"github.com/0xlebogang/envy/api/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateHttpServer(t *testing.T) {
	tests := []struct {
		name string
		cfg  *config.Env
	}{
		{
			name: "should create HTTP server with correct address",
			cfg:  &config.Env{Port: "8080"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := &Server{cfg: tt.cfg, db: &gorm.DB{}, router: gin.Default()}

			svr := s.createHttpServer()
			t.Log(svr.Addr)

			expectedAddr := ":" + tt.cfg.Port
			assert.Equal(t, expectedAddr, svr.Addr)
		})
	}
}
