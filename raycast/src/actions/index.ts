import { closeMainWindow, getPreferenceValues, popToRoot } from "@raycast/api";
import { runAppleScript } from "run-applescript";
import { Preferences, Tab } from "../interfaces";
import { NOT_INSTALLED_MESSAGE, SEARCH_ENGINE } from "../constants";
import { execSync } from "child_process";

export async function openNewTabWithoutMozicli(queryText: string | null | undefined): Promise<boolean | string> {
  popToRoot();
  closeMainWindow({ clearRootSearch: true });

  const script = `
    tell application "Firefox"
      activate
      repeat while not frontmost
        delay 0.1
      end repeat
      tell application "System Events"
        keystroke "t" using {command down}
        ${
          queryText
            ? `keystroke "l" using {command down}
           keystroke "a" using {command down}
           key code 51
           keystroke "${SEARCH_ENGINE[getPreferenceValues<Preferences>().searchEngine.toLowerCase()]}${queryText}"
           key code 36`
            : ""
        }
      end tell
    end tell
  `;
  await checkAppInstalled();

  return await runAppleScript(script);
}

export async function openHistoryTab(url: string): Promise<boolean | string> {
  popToRoot();
  closeMainWindow({ clearRootSearch: true });

  const script = `
    tell application "Firefox"
      activate
      repeat while not frontmost
        delay 0.1
      end repeat
      tell application "System Events"
        keystroke "t" using {command down}
        keystroke "l" using {command down}
        keystroke "a" using {command down}
        key code 51
        keystroke "${url}"
        key code 36
      end tell
    end tell
  `;

  return await runAppleScript(script);
}

export async function openNewTab(queryText: string | null | undefined): Promise<void> {
  //await checkAppInstalled()
  execSync(`${getPreferenceValues().mozicli} tabs new ${queryText}`)
  await runAppleScript(`
    tell application "Firefox"
      activate
    end tell
  `)
}

export async function setActiveTab(tab: Tab): Promise<void> {
  await runAppleScript(`
    tell application "Firefox"
      activate
      repeat with w from 1 to count of windows
        set startTab to name of window 1
        repeat
            if name of window 1 contains "${tab.title}" then 
              exit repeat
            else
              tell application "System Events" to key code 48 using control down
            end if
            if name of window 1 is startTab then exit repeat
        end repeat
      end repeat
    end tell
  `);
}

export async function switchTab(tab: Tab): Promise<void> {
  //await checkAppInstalled()
  execSync(`${getPreferenceValues().mozicli} tabs switch ${tab.windowId}:${tab.id}`)
  await runAppleScript(`
    tell application "Firefox"
      activate
    end tell
`)
}

export async function closeTab(tab: Tab): Promise<void> {
  //await checkAppInstalled()
  execSync(`${getPreferenceValues().mozicli} tabs close ${tab.windowId}:${tab.id}`)
}

export async function switchTabWithoutMozicli(tab: Tab): Promise<void> {
  if (tab.active) {
    await runAppleScript(`
      tell application "Firefox"
        activate  
      end tell
    `)
  } else
  // Cmd l
  // Cmd a
  // Backspace Backspace
  // % tab.title
  // arrow down
  // enter
  // F6
  await runAppleScript(`
    tell application "Firefox"
      activate  
    tell application "System Events" to keystroke "l" using command down
    delay 0.01
    tell application "System Events" to keystroke "a" using command down
    delay 0.01
    tell application "System Events" to key code 51
    delay 0.01
    tell application "System Events" to key code 51
    delay 0.01
    tell application "System Events" to keystroke "% "
    delay 0.01
    tell application "System Events" to keystroke "${tab.url}"

    delay 0.5
    tell application "System Events" to key code 125
    delay 0.1
    tell application "System Events" to key code 36

    tell application "System Events" to key code 63
    delay 0.1
    tell application "System Events" to key code 97
    end tell
`);
}

const checkAppInstalled = async () => {
  const appInstalled = await runAppleScript(`
set isInstalled to false
try
    do shell script "osascript -e 'exists application \\"Firefox\\"'"
    set isInstalled to true
end try

return isInstalled`);
  if (appInstalled === "false") {
    throw new Error(NOT_INSTALLED_MESSAGE);
  }
};
