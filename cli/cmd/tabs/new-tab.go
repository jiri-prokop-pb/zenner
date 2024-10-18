package tabs

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/jiri-prokop-pb/zenner/core"
)

var NewTabCmd = &cobra.Command{
	Use:   "new",
	Short: "Open a new tab",
	Long: "Open a new tab" +
		"\n\n" +
		"Allowed argument(s):" +
		"\n" +
		"url or space-separated keywords" +
		"\n" +
		"e.g" +
		"\n" +
		"zenner tabs new https://root.cz" +
		"\n" +
		"e.g" +
		"\n" +
		"zenner tabs new what is zen browser" +
		"\n\n",
	Run: func(_ *cobra.Command, args []string) {
		app, err := core.NewApp()
		if err != nil {
			fmt.Println(err)
			return
		}
		app.NewTab(strings.Join(args, " "))
	},
}