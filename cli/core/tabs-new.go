package core

import (
	"github.com/jiri-prokop-pb/zenner/browser/core/models"
)

func (a *App) NewTab(query string) {
	var command models.Command

	if query != "" {
		command = models.Command{
			Command: "new-tab",
			Args:    query,
		}
	} else {
		command = models.Command{
			Command: "new-tab",
		}
	}

	<-a.browser.Send(command)
}
