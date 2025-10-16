package utils_test

import (
	"testing"

	"github.com/0xlebogang/envy/utils"
)

type CustomError struct {
	msg string
}

func (e CustomError) Error() string {
	return e.msg
}

func TestFailOnError(t *testing.T) {
	testCases := []struct {
		description string
		err         error
		msg         string
	}{
		{
			description: "should not panix when err is nil",
			err:         nil,
			msg:         "test message",
		},
		{
			description: "should panic when err is not nil",
			err:         CustomError{msg: "custom error occurred"},
			msg:         "custom error occurred",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.description, func(t *testing.T) {
			if tc.err == nil {
				// Test that no panic occurs when err is nil
				defer func() {
					if r := recover(); r != nil {
						t.Errorf("FailOnError panicked unexpectedly: %v", r)
					}
				}()
				utils.FailOnError(tc.err, tc.msg)
			}
		})
	}
}
