package auth

import (
	"fmt"

	"github.com/coreos/go-oidc/v3/oidc"
)

type IAuthClaims interface {
	ExtractUserInfo(idToken *oidc.IDToken, accessToken, refreshToken string) (*UserInfo, error)
}

type OIDCClaims struct {
	Subject string `json:"sub"`
}

type UserInfo struct {
	ID           string
	AccessToken  string
	RefreshToken string
}

func (a *AuthClient) ExtractUserInfo(idToken *oidc.IDToken, accessToken, refreshToken string) (*UserInfo, error) {
	var claims OIDCClaims
	if err := idToken.Claims(&claims); err != nil {
		return nil, fmt.Errorf("failed to parse claims: %w", err)
	}
	return &UserInfo{
		ID:           claims.Subject,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
