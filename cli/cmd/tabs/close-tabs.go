package tabs

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/jiri-prokop-pb/zenner/core"
)

var CloseTabCmd = &cobra.Command{
	Use:   "close",
	Short: `Close one or more tabs`,
	Long:  "close one or more tabs by id(s)\n\nRequired argument(s):\nOne or more string, each composed of {windowId}:{tabId} \ne.g\n  zenner tabs close 3:112 3:113\n\n",
	Args:  cobra.MinimumNArgs(1),
	Run: func(_ *cobra.Command, args []string) {
		app, err := core.NewApp()
		if err != nil {
			fmt.Println(err)
			return
		}
		app.TabsClose(args)
	},
}
