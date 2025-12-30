package auth

import (
	"fmt"

	"github.com/coreos/go-oidc/v3/oidc"
)

type IAuthClaims interface {
	ExtractUserInfo(idToken *oidc.IDToken, accessToken, refreshToken string) (*UserInfo, error)
}

type AuthClaims struct{}

type OIDCClaims struct {
	Subject           string   `json:"sub"`
	Email             string   `json:"email"`
	EmailVerified     bool     `json:"email_verified"`
	Name              string   `json:"name"`
	PreferredUsername string   `json:"preferred_username"`
	Organization      string   `json:"urn:zitadel:iam:org:id"`
	OrgName           string   `json:"urn:zitadel:iam:org:name"`
	Roles             []string `json:"urn:zitadel:iam:roles"`
}

type UserInfo struct {
	ID           string
	Email        string
	Name         string
	Organization string
	Roles        []string
	IDToken      string
	AccessToken  string
	RefreshToken string
}

func (a *AuthClaims) ExtractUserInfo(idToken *oidc.IDToken, accessToken, refreshToken string) (*UserInfo, error) {
	var claims OIDCClaims
	if err := idToken.Claims(&claims); err != nil {
		return nil, fmt.Errorf("Failed to parse claims: %w", err)
	}

	return &UserInfo{
		ID:           claims.Subject,
		Email:        claims.Email,
		Name:         claims.Name,
		Organization: claims.Organization,
		Roles:        claims.Roles,
		IDToken:      idToken.Subject,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
