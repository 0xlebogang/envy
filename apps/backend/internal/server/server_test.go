package server

import (
	"fmt"
	"testing"

	"github.com/0xlebogang/envy/backend/internal/config"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestCreateHTTPServer(t *testing.T) {
	mockDB := gorm.DB{}
	mockConfig := config.Config{
		Port: "1234",
	}

	svr := New(&mockConfig, &mockDB)
	httpServer := svr.createHttpServer()

	assert.NotNil(t, httpServer)
	assert.NotNil(t, httpServer.Handler)
	assert.Equal(t, fmt.Sprintf(":%s", "1234"), httpServer.Addr)
}
