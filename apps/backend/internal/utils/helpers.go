package utils

import (
	"errors"

	"github.com/jackc/pgx/v5/pgconn"
)

func StrToPtr(s string) *string {
	return &s
}

func IsUniqueViolation(e error) bool {
	var pgErr *pgconn.PgError
	if errors.As(e, &pgErr) {
		return pgErr.Code == "23505"
	}
	return false
}
