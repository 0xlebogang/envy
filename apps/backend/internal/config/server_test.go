package config_test

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/0xlebogang/envy/internal/config"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockDependencies struct {
	mock.Mock
}

func (m *MockDependencies) EnvGetter(key string) string {
	args := m.Called(key)
	return args.String(0)
}

func (m *MockDependencies) SignalNotify(c chan<- os.Signal, sig ...os.Signal) {
	m.Called(c, sig)
}

func TestNewServer(t *testing.T) {
	cfg := &config.Config{
		Port:               "8080",
		DbURL:              "test://localhost",
		CORSAllowedOrigins: "http://localhost:3000",
	}

	server := config.NewServer(cfg)

	assert.NotNil(t, server)
	assert.NotNil(t, server.Echo)
	assert.Equal(t, cfg, server.Config)
}

func TestGetCORSOrigins(t *testing.T) {
	tests := []struct {
		name        string
		environment string
		expected    []string
	}{
		{
			name:        "development environment should return wildcard",
			environment: "development",
			expected:    []string{"*"},
		},
		{
			name:        "production environment should return configured origins",
			environment: "production",
			expected:    []string{"http://localhost:3000", "https://myapp.com"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockDeps := &config.ServerDependencies{
				EnvGetter: func(key string) string {
					if key == "ENVIRONMENT" {
						return tt.environment
					}
					return ""
				},
				SignalNotify: func(chan<- os.Signal, ...os.Signal) {},
			}

			cfg := &config.Config{
				Port:               "1323",
				CORSAllowedOrigins: "http://localhost:3000,https://myapp.com",
			}

			server := config.NewServerWithDeps(cfg, mockDeps)
			origins := server.GetCORSOrigins()

			assert.Equal(t, tt.expected, origins)
		})
	}
}

func TestHealthHandler(t *testing.T) {
	cfg := &config.Config{Port: "8080"}
	server := config.NewServer(cfg)
	server.RegisterRoutes()

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()

	server.Echo.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Contains(t, rec.Body.String(), `"status":"ok"`)
	assert.Contains(t, rec.Body.String(), "server_time")
}

func TestStartWithContext(t *testing.T) {
	cfg := &config.Config{Port: "0"} // Use port 0 for testing

	mockDeps := &config.ServerDependencies{
		EnvGetter: func(key string) string { return "test" },
		SignalNotify: func(chan<- os.Signal, ...os.Signal) {
			// Mocked signal notify
		},
	}

	server := config.NewServerWithDeps(cfg, mockDeps)
	server.RegisterRoutes()

	// Test context cancellation
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	err := server.StartWithContext(ctx)
	assert.NoError(t, err)
}

func TestServerShutdown(t *testing.T) {
	cfg := &config.Config{Port: "0"}
	server := config.NewServer(cfg)

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	err := server.Shutdown(ctx)
	// Should not error even if server wasn't started
	assert.NoError(t, err)
}
