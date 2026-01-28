package config

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetEnv(t *testing.T) {
	tests := []struct {
		name          string
		key           string
		value         string
		fallback      string
		expectedValue string
	}{
		{
			name:          "should get set environment variable correctly",
			key:           "TEST_KEY",
			value:         "test_value",
			fallback:      "default_value",
			expectedValue: "test_value",
		},
		{
			name:          "should get fallback envrionment variable when not set",
			key:           "UNSET_KEY",
			value:         "",
			fallback:      "default_value",
			expectedValue: "default_value",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.value != "" {
				os.Setenv(tt.key, tt.value)
			}
			defer os.Unsetenv(tt.key)

			result := getEnv(tt.key, tt.fallback)
			t.Log(result)

			assert.Equal(t, tt.expectedValue, result)
		})
	}
}
