package main

import (
	"encoding/json"
	"log"
	"os"

	ipc "github.com/james-barrow/golang-ipc"
	host "github.com/rickypc/native-messaging-host"
)

func main() {
	// Listen to, and handle incoming ipc message:
	// - forward each incoming message to the web-browser
	// - send back each browser response as outgoing ipc message
	//
	// It acts like a web-browser proxy

	webBrowserProxy("zenner-ipc-bridge")
}

func webBrowserProxy(ipcName string) {
	ipcConfig := &ipc.ServerConfig{
		Encryption:        true,
		UnmaskPermissions: true,
	}
	ipcServer, err := ipc.StartServer(ipcName, ipcConfig)
	if err != nil {
		log.Fatalf("Error starting %s ipc-server: %v", ipcName, err)
	}

	browserMessagingClient := (&host.Host{}).Init()

	// Listen to client, and handle incoming message
	for {
		message, _ := ipcServer.Read()
		if message.MsgType > 0 {

			// Parse incoming message
			incomingMessage := IpcIncomingMessage{}
			json.Unmarshal(message.Data, &incomingMessage)

			// Send incoming message to browser
			request := &host.H{"payload": incomingMessage}
			if err := browserMessagingClient.PostMessage(os.Stdout, request); err != nil {
				os.Exit(1)
			}

			for {
				// Wait for browser messages
				// browser may send many messages before the data:end message
				response := &host.H{}

				if err := browserMessagingClient.OnMessage(os.Stdin, response); err != nil {
					os.Exit(1)
				}

				// send back browser message to client
				responseMessage, _ := json.Marshal(response)
				err = ipcServer.Write(1, responseMessage)

				if err != nil {
					os.Exit(1)
				}

				// end of browser response for the incoming message
				if string(responseMessage) == `{"data":"end"}` {
					break
				}
			}
		}
	}
}

type IpcIncomingMessage struct {
	Command string `json:"command" binding:"required"`
	Args    string `json:"args,omitempty"`
}
