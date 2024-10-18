package tabs

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/jiri-prokop-pb/zenner/core"
)

var GetTabsCmd = &cobra.Command{
	Use:   "get",
	Short: `Get all opened tabs`,
	Long: "Get all opened tabs\n\n",
	Run: func(_ *cobra.Command, _ []string) {
		app, err := core.NewApp()
		if err != nil {
			fmt.Println(err)
			return
		}
		app.TabsJson()
	},
}