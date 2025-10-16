package config_test

import (
	"os"
	"testing"

	"github.com/0xlebogang/envy/internal/config"
	"github.com/0xlebogang/envy/utils"
	"github.com/stretchr/testify/mock"
)

type MockEnvGetter struct {
	mock.Mock
}

// GetEnv is a mock implementation of the EnvGetter function type.
func (m *MockEnvGetter) GetEnv(key, fallback string) string {
	args := m.Called(key, fallback)
	return args.String(0)
}

func TestGetEnv(t *testing.T) {
	testCases := []struct {
		description string
		key         string
		value       string
		fallback    string
		setEnv      bool
		expected    string
	}{
		{
			description: "should return the environment value when set",
			key:         "TEST_KEY",
			value:       "test_value",
			fallback:    "fallback_value",
			setEnv:      true,
			expected:    "test_value",
		},
		{
			description: "returns fallback when environment variable not set",
			key:         "NONEXISTENT_KEY",
			fallback:    "fallback_value",
			value:       "",
			setEnv:      false,
			expected:    "fallback_value",
		},
		{
			description: "returns empty string when env is empty and fallback is empty",
			key:         "EMPTY_KEY",
			fallback:    "",
			value:       "",
			setEnv:      true,
			expected:    "",
		},
		{
			description: "returns environment value when it's empty string but set",
			key:         "EMPTY_ENV_KEY",
			fallback:    "fallback_value",
			value:       "",
			setEnv:      true,
			expected:    "",
		},
		{
			description: "returns environment value with spaces",
			key:         "SPACES_KEY",
			fallback:    "fallback",
			value:       "  spaced value  ",
			setEnv:      true,
			expected:    "  spaced value  ",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.description, func(t *testing.T) {
			defer func() {
				err := os.Unsetenv(tc.key)
				utils.FailOnError(err, "Failed to unset environment variable")
			}()

			if tc.setEnv {
				err := os.Setenv(tc.key, tc.value)
				utils.FailOnError(err, "Failed to set environment variable")
			}

			result := config.GetEnv(tc.key, tc.fallback)
			if result != tc.expected {
				t.Errorf("expected %q, got %q", tc.expected, result)
			}
		})
	}
}

func TestLoadEnv(t *testing.T) {
	t.Run("should call GetEnv with correct parameters using testify mock", func(t *testing.T) {
		mockGetter := new(MockEnvGetter)

		mockGetter.On("GetEnv", "PORT", "1323").Return("3000")
		mockGetter.On("GetEnv", "DATABASE_URL", "postgresql://root:password@localhost:5433/postgres").Return("postgresql://user:pass@localhost:5432/dbname")
		mockGetter.On("GetEnv", "CORS_ALLOWED_ORIGINS", "http://localhost:3001,http://127.0.0.1:3001").Return("http://localhost:3001,http://127.0.0.1:3001")

		config.LoadEnvWithGetter(mockGetter.GetEnv)
		mockGetter.AssertExpectations(t)
	})
}
