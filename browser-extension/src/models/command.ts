export enum CommandName {
  CLOSE_TABS = "close-tabs",
  GET_TABS = "get-tabs",
  NEW_TAB = "new-tab",
  SWITCH_TAB = "switch-tab",
}

export type Command = { 
  command: CommandName
  args?: string
} 
