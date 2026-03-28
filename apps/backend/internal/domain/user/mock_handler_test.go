package user

import "github.com/gin-gonic/gin"

type fakeHandler struct {
	Called map[string]bool
}

func newFakeHandler() Handler {
	return &fakeHandler{Called: make(map[string]bool)}
}

func (f *fakeHandler) GetUserByEmail() gin.HandlerFunc {
	//TODO implement me
	panic("implement me")
}

func (f *fakeHandler) CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		f.Called["CreateUser"] = true
		c.JSON(200, gin.H{"ok": true})
	}
}

func (f *fakeHandler) GetUserByID() gin.HandlerFunc {
	return func(c *gin.Context) {
		f.Called["GetUserByID"] = true
		c.JSON(200, gin.H{"ok": true})
	}
}

func (f *fakeHandler) GetAllUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		f.Called["GetAllUsers"] = true
		c.JSON(200, gin.H{"ok": true})
	}
}

func (f *fakeHandler) UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		f.Called["UpdateUser"] = true
		c.JSON(200, gin.H{"ok": true})
	}
}

func (f *fakeHandler) DeleteUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		f.Called["DeleteUser"] = true
		c.JSON(200, gin.H{"ok": true})
	}
}
