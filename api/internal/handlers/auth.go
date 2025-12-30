package handlers

import (
	"context"
	"net/http"

	"github.com/0xlebogang/sekrets/internal/auth"
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
}

func New(authClient *auth.AuthClient) *AuthHandlers {
	return &AuthHandlers{auth: authClient}
}

func (h *AuthHandlers) LoginHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		state := generateRandomState()
		ctx.SetCookie("oauth_state", state, 3600, "/", "", false, true)
		ctx.Redirect(http.StatusFound, h.auth.AuthUrl(state))
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

		ctx.JSON(http.StatusOK, gin.H{"data": userInfo})
	}
}
