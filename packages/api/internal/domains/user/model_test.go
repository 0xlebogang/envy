package user

import (
	"testing"

	"github.com/0xlebogang/sekrets/internal/validation"
	"github.com/stretchr/testify/assert"
)

func TestUserValidation(t *testing.T) {
	validation.Init()
	v := validation.GetValidator()

	tests := []struct {
		name    string
		model   *User
		wantErr bool
	}{
		{
			name: "should not have any error",
			model: &User{
				Name:     "test user",
				Email:    "testuser@email.com",
				Password: &[]string{"securepassword"}[0],
			},
			wantErr: false,
		},
		{
			name: "should return error for invalid email",
			model: &User{
				Name:     "test user",
				Email:    "invalid-email",
				Password: &[]string{"securepassword"}[0],
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Struct(tt.model)
			if tt.wantErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestUserUpdateValidation(t *testing.T) {
	validation.Init()
	v := validation.GetValidator()

	tests := []struct {
		name    string
		model   *UserUpdate
		wantErr bool
	}{
		{
			name: "should not have any error",
			model: &UserUpdate{
				Email: &[]string{"testuser@email.com"}[0],
			},
			wantErr: false,
		},
		{
			name: "should return error for invalid email",
			model: &UserUpdate{
				Email: &[]string{"invalid-email"}[0],
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := v.Struct(tt.model)
			if tt.wantErr {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func TestUserResult(t *testing.T) {
	testUser := &User{
		Email:    "testuser@email.com",
		Name:     "Test User",
		Avatar:   &[]string{"http://example.com/avatar.png"}[0],
		Password: &[]string{"securepassword"}[0],
	}

	result := testUser.Result()

	assert.Equal(t, testUser.Email, result.Email)
	assert.Equal(t, testUser.Name, result.Name)
	assert.Equal(t, testUser.Avatar, result.Avatar)
	assert.Nil(t, result.Password)
}
