package ports

import "github.com/jiri-prokop-pb/zenner/browser/core/models"

type CommandSender interface {
	Send(models.Command) <-chan models.CommandResult
}
