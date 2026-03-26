package config

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetEnv(t *testing.T) {
	tests := []struct {
		name     string
		key      string
		value    string
		fallback string
		expected string
	}{
		{
			name:     "should return value of key from environment",
			key:      "TEST_KEY",
			value:    "test-value",
			fallback: "",
			expected: "test-value",
		},
		{
			name:     "should return value of fallback when environment is not set",
			key:      "UNSET_TEST_KEY",
			value:    "",
			fallback: "fallback-value",
			expected: "fallback-value",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.value != "" {
				if err := os.Setenv(tt.key, tt.value); err != nil {
					t.Errorf("Failed to set environment variable: %v", err)
				}
			}

			result := getEnv(tt.key, tt.fallback)
			assert.Equal(t, tt.expected, result)

			if err := os.Unsetenv(tt.key); err != nil {
				t.Errorf("Failed to unset environment variable: %v", err)
			}
		})
	}
}
