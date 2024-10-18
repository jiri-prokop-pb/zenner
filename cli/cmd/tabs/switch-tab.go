package tabs

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/jiri-prokop-pb/zenner/core"
)

var SwitchTabCmd = &cobra.Command{
	Use:   "switch",
	Short: `Switch to a given tab`,
	Long: "Switch to a given tab by id" +
		"\n\n" +
		"Required argument:" +
		"\n" +
		"A string composed of {windowId}:{tabId}" +
		"\n" +
		"e.g" +
		"\n" +
		"zenner tabs switch 1:100" +
		"\n\n",
	Args: cobra.ExactArgs(1),
	Run: func(_ *cobra.Command, args []string) {
		app, err := core.NewApp()
		if err != nil {
			fmt.Println(err)
			return
		}
		app.TabsSwitch(args[0])
	},
}