package core

import (
	"github.com/jiri-prokop-pb/zenner/browser/core/models"
)

func (a *App) TabsSwitch(tabId string) {
	<-a.browser.Send(
		models.Command{
			Command: "switch-tab",
			Args:    tabId,
		},
	)
}
