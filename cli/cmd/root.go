package cmd

import (
	"os"

	"github.com/spf13/cobra"

	"github.com/jiri-prokop-pb/zenner/cmd/tabs"
)

var rootCmd = &cobra.Command{
	Use:   "zenner",
	Short: "A cli to interact with Zen Browser",
	Long: `
Zenner is a CLI to control a Zen Browser instance:
- retrieve tabs
- switch tabs
- close tabs
`,
}

func init() {
	rootCmd.AddCommand(tabs.TabsCmd)
}
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}
