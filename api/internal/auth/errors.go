package auth

type IAuthErrors interface {
	InvalidTokenError(err error) *AuthError
	ExpiredTokenError(err error) *AuthError
}

type AuthErrorCode string

const (
	InvalidToken AuthErrorCode = "INVALID_TOKEN"
	ExpiredToken AuthErrorCode = "EXPIRED_TOKEN"
)

type AuthError struct {
	Code    AuthErrorCode
	Message string
	Err     error
}

func (a *AuthError) InvalidTokenError(err error) *AuthError {
	return &AuthError{
		Code:    InvalidToken,
		Message: "The provided token is invalid.",
		Err:     err,
	}
}

func (a *AuthError) ExpiredTokenError(err error) *AuthError {
	return &AuthError{
		Code:    ExpiredToken,
		Message: "The provided token has expired.",
		Err:     err,
	}
}
