package core

import (
	"strings"

	"github.com/jiri-prokop-pb/zenner/browser/core/models"
)

func (a *App) TabsClose(tabIds []string) {
	<-a.browser.Send(
		models.Command{
			Command: "close-tabs",
			Args:    strings.Join(tabIds, ","),
		},
	)
}
