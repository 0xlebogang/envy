package handlers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/0xlebogang/sekrets/internal/auth"
	"github.com/0xlebogang/sekrets/internal/config"
	"github.com/gin-gonic/gin"
)

type IAuthHandlers interface {
	LoginHandler()
	CallbackHandler()
	LogoutHandler()
	MeHandler()
}

type AuthHandlers struct {
	auth *auth.AuthClient
	Cfg  *config.Config
}

func New(authClient *auth.AuthClient, cfg *config.Config) *AuthHandlers {
	return &AuthHandlers{auth: authClient, Cfg: cfg}
}

func (h *AuthHandlers) LoginHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		state := generateRandomState()
		ctx.SetCookie("oauth_state", state, 3600, "/", "", false, true)
		ctx.Redirect(http.StatusFound, h.auth.AuthUrl(state))
	}
}

func (h *AuthHandlers) RefreshTokenHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		refreshToken, err := ctx.Cookie(h.Cfg.RefreshTokenCookieName)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "missing refresh token"})
			return
		}

		newTokens, err := h.auth.RefreshToken(ctx.Request.Context(), refreshToken)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "failed to refresh token"})
			return
		}

		ctx.SetCookie(h.Cfg.AuthCookieName, newTokens.AccessToken, int(time.Hour.Seconds()), "/", "localhost", false, true)

		if newTokens.RefreshToken != "" && newTokens.RefreshToken != refreshToken {
			ctx.SetCookie(h.Cfg.RefreshTokenCookieName, newTokens.RefreshToken, int(7*24*time.Hour.Seconds()), "/", "localhost", false, true)
		}

		ctx.JSON(http.StatusOK, gin.H{
			"access_token": newTokens.AccessToken,
			"success":      true,
		})
	}
}

func (h *AuthHandlers) CallbackHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		code := ctx.Query("code")
		state := ctx.Query("state")

		storedState, err := ctx.Cookie("oauth_state")
		if state != storedState {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid state"})
			return
		}

		token, err := h.auth.Exchange(context.Background(), code)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "token exchange failed"})
			return
		}

		rawIdToken, ok := token.Extra("id_token").(string)
		if !ok {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "missing id token"})
			return
		}

		idToken, err := h.auth.VerifyIdToken(context.Background(), rawIdToken)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid token id"})
			return
		}

		userInfo, err := h.auth.ExtractUserInfo(idToken, token.AccessToken, token.RefreshToken)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to extract user info"})
			return
		}

		ctx.SetCookie(h.Cfg.AuthCookieName, userInfo.AccessToken, 3600, "/", "localhost", false, true)
		ctx.SetCookie(h.Cfg.RefreshTokenCookieName, userInfo.RefreshToken, int(7*24*time.Hour.Seconds()), "/", "localhost", false, true)
		ctx.Redirect(http.StatusFound, h.Cfg.PostLoginRedirectUrl)
	}
}

func (h *AuthHandlers) LogoutHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"provider_endpoint": fmt.Sprintf("%s%s", h.Cfg.OIDCIssuer, "/oidc/v1/end_session"),
		})
	}
}
