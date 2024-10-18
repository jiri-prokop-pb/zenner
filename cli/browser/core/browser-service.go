package core

import (
	"github.com/jiri-prokop-pb/zenner/browser/core/ports"
	"github.com/jiri-prokop-pb/zenner/browser/infra"
)

type BrowserService struct {
	ports.CommandSender
}

func NewBrowserService() *BrowserService {
	return &BrowserService{infra.NewIpcClient("zenner-ipc-bridge")}
}
