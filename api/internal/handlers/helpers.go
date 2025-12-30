package handlers

import "crypto/rand"

func generateRandomState() string {
	return rand.Text()
}
