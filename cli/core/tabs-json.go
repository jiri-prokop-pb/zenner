package core

import (
	"encoding/json"
	"fmt"
)

func (a *App) TabsJson() {
	channel := a.TabsGet()
	tabs := <-channel
	// TODO: handle error
	tabsAsString, _ := json.Marshal(tabs)

	fmt.Println(string(tabsAsString))
	<-channel
}
