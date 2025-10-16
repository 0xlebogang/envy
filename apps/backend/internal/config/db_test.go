package config_test

import (
	"errors"
	"testing"

	"github.com/0xlebogang/envy/internal/config"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

type MockDBConn struct {
	mock.Mock
}

func (m *MockDBConn) Open(dialector gorm.Dialector, config *gorm.Config) (*gorm.DB, error) {
	args := m.Called(dialector, config)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*gorm.DB), args.Error(1)
}

func (m *MockDBConn) Close(db *gorm.DB) error {
	args := m.Called(db)
	return args.Error(0)
}

func TestDBConnectionOpenAndClosing(t *testing.T) {
	testCases := []struct {
		description string
		dbUrl       string
		expectError bool
	}{
		{
			description: "should successfully create and close DB connection",
			dbUrl:       "postgres://root:password@localhost:5433/postgres",
			expectError: false,
		},
		{
			description: "should handle error when Open fails",
			dbUrl:       "invalid_db_url",
			expectError: true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.description, func(t *testing.T) {
			mockOpener := new(MockDBConn)

			// Track if onError was called
			onErrorCalled := false
			var capturedError error
			var capturedMsg string

			onErrorCallback := func(err error, msg string) {
				onErrorCalled = true
				capturedError = err
				capturedMsg = msg
			}

			if tc.expectError {
				// Mock Open to return an error
				mockOpener.On("Open", mock.Anything, mock.Anything).Return(nil, errors.New("connection failed"))

				// Call the function under test
				dbConn := config.CreateDBConnection(tc.dbUrl, mockOpener, onErrorCallback)

				// Assertions for error case
				if dbConn != nil {
					t.Errorf("expected nil db connection on error, got %v", dbConn)
				}
				if !onErrorCalled {
					t.Error("expected onError callback to be called")
				}
				if capturedError == nil {
					t.Error("expected error to be passed to onError callback")
				}
				if capturedMsg != "Failed to connect to database" {
					t.Errorf("expected message 'Failed to connect to database', got %s", capturedMsg)
				}
			} else {
				// Create a mock DB instance
				mockDB := &gorm.DB{}

				// Mock Open to return success
				mockOpener.On("Open", mock.Anything, mock.Anything).Return(mockDB, nil)
				// Mock Close to return success
				mockOpener.On("Close", mockDB).Return(nil)

				// Call the function under test
				dbConn := config.CreateDBConnection(tc.dbUrl, mockOpener, onErrorCallback)

				// Assertions for success case
				if dbConn == nil {
					t.Error("expected valid db connection, got nil")
				}
				if dbConn != mockDB {
					t.Error("expected returned db to match mock db")
				}

				// Test closing the connection
				onErrorCalled = false // Reset for close test
				config.CloseDBConnection(dbConn, mockOpener, onErrorCallback)

				// Verify Close was called
				mockOpener.AssertCalled(t, "Close", mockDB)
			}

			// Verify all expectations were met
			mockOpener.AssertExpectations(t)
		})
	}
}
