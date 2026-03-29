package utils

import (
	"golang.org/x/crypto/bcrypt"
)

type PasswordUtils interface {
	Verify(hash, raw string) error
	Hash(password string) (string, error)
}

type passwordUtils struct{}

func NewPasswordUtils() PasswordUtils {
	return &passwordUtils{}
}

func (p *passwordUtils) Verify(hash, raw string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(raw))
}

func (p *passwordUtils) Hash(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}
