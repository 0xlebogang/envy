package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetEnv(t *testing.T) {
	tests := []struct {
		name     string
		key      string
		fallback string
		envValue string
		expected string
	}{
		{
			name:     "should get correct value from environment variable",
			key:      "TEST_ENV_VAR",
			fallback: "default_value",
			envValue: "actual_value",
			expected: "actual_value",
		},
		{
			name:     "should return fallback when environment variable is not set",
			key:      "NON_EXISTENT_ENV_VAR",
			fallback: "default_value",
			envValue: "",
			expected: "default_value",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			if tc.envValue != "" {
				t.Setenv(tc.key, tc.envValue)
			}
			result := getEnv(tc.key, tc.fallback)
			if result != tc.expected {
				t.Errorf("Expected %s but got %s", tc.expected, result)
			}
		})
	}
}

func TestLoadConfig(t *testing.T) {
	t.Setenv("PORT", ":9090")
	config := Load()
	assert.Equal(t, ":9090", config.Port)
}
