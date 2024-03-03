package tabs

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/egovelox/mozicli/core"
)

var TabsCmd = &cobra.Command{
	Use:   "tabs",
	Short: "Tabs is a palette that contains tabs based commands",
	Long:  ``,
	Run: func(_ *cobra.Command, _ []string) {
		app, err := core.NewApp()
		if err != nil {
			fmt.Println(err)
			return
		}
		app.Tabs("")
	},
}

func init() {
}
