package utils

import "log"

type OnErrorCallback func(error, string)

func FailOnError(err error, msg string) {
    if err != nil {
        log.Fatalf("%s: %v", msg, err)
    }
}
