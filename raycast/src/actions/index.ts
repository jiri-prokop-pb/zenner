import { ZennerTab, Tab } from "../interfaces";
import { execSync } from "child_process";
import { BROWSER_NAME, CLI_TOOL, TABS_FALLBACK } from "../constants";

export function openNewTab(queryText: string | null | undefined): void {
  // default empty query for empty tab
  let query = "";

  if (queryText) {
    query = ` -- "${queryText}"`;
  }

  execSync(`${CLI_TOOL} tabs new${query}`);
  openBrowser();
}

export function switchTab(tab: Tab): void {
  execSync(`${CLI_TOOL} tabs switch ${tab.windowId}:${tab.id}`);
  openBrowser();
}

export function closeTab(tab: Tab): void {
  execSync(`${CLI_TOOL} tabs close ${tab.windowId}:${tab.id}`);
}

export function fetchOpenTabs(): Tab[] {
  const data = execSync(`${CLI_TOOL} tabs get`);
  const parsedTabs: { data: ZennerTab[] } = JSON.parse(data.toString() || TABS_FALLBACK);

  // TODO: instead of Tab class create just a mapper function
  return parsedTabs.data.map(
    (browserTab) =>
      new Tab(
        browserTab.id,
        browserTab.index,
        browserTab.pinned,
        browserTab.windowId,
        browserTab.title,
        browserTab.url,
        browserTab.faviconUrl,
        browserTab.lastAccessed,
        browserTab.active,
      ),
  );
}

export function openBrowser() {
  execSync(`open -a "${BROWSER_NAME}"`);
}
