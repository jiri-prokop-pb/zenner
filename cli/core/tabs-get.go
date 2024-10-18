package core

import (
	"encoding/json"

	"github.com/jiri-prokop-pb/zenner/browser/core/models"
)

func (a *App) TabsGet() <-chan models.Tabs {

	channel := make(chan models.Tabs)

	go func() {
		defer close(channel)
		for result := range a.browser.Send(
			models.Command{
				Command: "get-tabs",
			},
		) {
			tabs := models.Tabs{}
			// TODO: handle error
			json.Unmarshal(result.Data, &tabs)
			channel <- tabs
		}
	}()

	return channel

}
