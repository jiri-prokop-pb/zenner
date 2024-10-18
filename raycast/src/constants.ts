import { getPreferenceValues } from "@raycast/api";

const preferences = getPreferenceValues<Preferences.Zenner>();
export const COMMAND_NAME = "Zenner";
export const CLI_TOOL = preferences.cliTool;
export const BROWSER_NAME = preferences.browserName;
export const TABS_FALLBACK = `{"data":[]}`;

export const UnknownErrorText = `
## 🚨 Error 

Something happened while trying to run your command.`;

export const DEFAULT_ERROR_TITLE = "An Error Occurred";
