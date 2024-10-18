package core

import (
	"github.com/jiri-prokop-pb/zenner/browser/core"
)

type App struct {
	browser *core.BrowserService
}

func NewApp() (*App, error) {
	browser := core.NewBrowserService()

	return &App{browser: browser}, nil
}
