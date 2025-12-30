package auth

import (
	"context"
	"fmt"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
)

type IAuthClient interface {
	AuthUrl(state string) string
	Exchange(ctx context.Context, code string) (*oauth2.Token, error)
	VerifyIdToken(ctx context.Context, rawIdToken string) (*oidc.IDToken, error)
}

type AuthClient struct {
	provider *oidc.Provider
	config   *oauth2.Config
	verifier *oidc.IDTokenVerifier
}

type AuthClientConfig struct {
	Issuer       string
	ClientId     string
	ClientSecret string
	RedirectURL  string
	Scopes       []string
}

func New(ctx context.Context, cfg *AuthClientConfig) (*AuthClient, error) {
	provider, err := oidc.NewProvider(ctx, cfg.Issuer)
	if err != nil {
		return nil, fmt.Errorf("Failed to get OIDC provider: %w", err)
	}

	oauth2Config := oauth2.Config{
		ClientID:     cfg.ClientId,
		ClientSecret: cfg.ClientSecret,
		RedirectURL:  cfg.RedirectURL,
		Endpoint:     provider.Endpoint(),
		Scopes:       cfg.Scopes,
	}

	verifier := provider.Verifier(&oidc.Config{
		ClientID: cfg.ClientId,
	})

	return &AuthClient{
		provider: provider,
		verifier: verifier,
		config:   &oauth2Config,
	}, nil
}

func (a *AuthClient) AuthUrl(state string) string {
	return a.config.AuthCodeURL(state, oauth2.AccessTypeOffline)
}

func (a *AuthClient) Exchange(ctx context.Context, code string) (*oauth2.Token, error) {
	return a.config.Exchange(ctx, code)
}

func (a *AuthClient) VerifyIdToken(ctx context.Context, rawIdToken string) (*oidc.IDToken, error) {
	return a.verifier.Verify(ctx, rawIdToken)
}
