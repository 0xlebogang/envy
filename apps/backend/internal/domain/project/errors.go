package project

import "errors"

type Error error

var ErrNoUserID Error = errors.New("no user ID")
