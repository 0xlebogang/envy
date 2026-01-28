package auth

import (
	"context"

	"github.com/0xlebogang/envy/api/internal/config"
	"github.com/zitadel/zitadel-go/v3/pkg/authorization"
	"github.com/zitadel/zitadel-go/v3/pkg/authorization/oauth"
	"github.com/zitadel/zitadel-go/v3/pkg/zitadel"
)

type AuthConfig struct {
	ZitadelClientID               string
	ZitadelAPIPersonalAccessToken string
	zitadelIssuerURL              string
	KeyFile                       string
}

func Init(ctx context.Context, cfg *config.Env) (*authorization.Authorizer[*oauth.IntrospectionContext], error) {
	authZ, err := authorization.New(ctx, zitadel.New(cfg.ZitadelDomain), oauth.DefaultAuthorization(cfg.ZitadelKey))
	if err != nil {
		return nil, err
	}
	return authZ, err
}
