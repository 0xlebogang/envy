package database

import (
	"database/sql"
	"os"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type mockDbDriver struct {
	mock.Mock
}

func (m *mockDbDriver) Open(dsn string) gorm.Dialector {
	args := m.Called(dsn)
	return args.Get(0).(gorm.Dialector)
}

type MockDatabase struct {
	mock.Mock
}

func (m *MockDatabase) DB() (*sql.DB, error) {
	args := m.Called()
	return args.Get(0).(*sql.DB), args.Error(1)
}

func TestConnect(t *testing.T) {
	if strings.ToLower(os.Getenv("ENVIRONMENT")) != "test" {
		t.Skip()
	}

	tests := []struct {
		name        string
		dbUrl       string
		expectError bool
	}{
		{
			name:        "should create a database connection successfully",
			dbUrl:       "postgres://root:password@localhost:5432/postgres",
			expectError: false,
		},
		{
			name:        "should fail to create a database connection",
			dbUrl:       "invalid_dsn",
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db, err := Connect(postgres.Open(tt.dbUrl))
			if tt.expectError {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, db)
			}
		})
	}
}

func TestClose(t *testing.T) {
	if strings.ToLower(os.Getenv("ENVIRONMENT")) != "test" {
		t.Skip()
	}

	// Creating a database connection for testing
	db, err := gorm.Open(postgres.Open("postgres://root:password@localhost:5432/postgres"), &gorm.Config{})
	assert.NoError(t, err)

	tests := []struct {
		name string
		db   *gorm.DB
	}{
		{
			name: "should close the database connection successfully",
			db:   db,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.NotPanics(t, func() {
				Close(tt.db)
			})
		})
	}
}
