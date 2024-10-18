import { Action, ActionPanel, closeMainWindow, Icon, PopToRootType, showToast, Toast } from "@raycast/api";
import { closeTab, openNewTab, switchTab } from "../actions";
import { Tab } from "../interfaces";

export class TabActions {
  public static NewTab = NewTabAction;
  public static OpenTabListItem = OpenTabListItemAction;
}

function NewTabAction({ query }: { query?: string }) {
  return (
    <ActionPanel title="New Tab">
      <OpenNewTabAction query={query || ""} />
      <Action onAction={() => openNewTab(query)} title={query ? `Search "${query}"` : "Open Empty Tab"} />
    </ActionPanel>
  );
}

function OpenTabListItemAction({ tab, onOpenTab, onCloseTab }: { tab: Tab; onOpenTab: (id: string) => void; onCloseTab: () => void }) {
  return (
    <ActionPanel title={tab.title}>
      <GoToOpenTabAction onOpenTab={onOpenTab} tab={tab} />
      <CloseTabAction tab={tab} onCloseTab={onCloseTab} />
      <Action.CopyToClipboard title="Copy URL" content={tab.url} />
    </ActionPanel>
  );
}

function CloseTabAction(props: { tab: Tab; onCloseTab: () => void }) {
  async function handleAction() {
    closeTab(props.tab);
    props.onCloseTab();
    await showToast({
      title: "",
      message: "Closed Tab!",
      style: Toast.Style.Success,
    });
  }

  return <Action title="Close Tab" icon={{ source: Icon.XMarkCircle }} onAction={handleAction} />;
}

function GoToOpenTabAction({ tab, onOpenTab }: { tab: Tab, onOpenTab: (id: string) => void }) {
  async function handleAction() {
    onOpenTab(tab.id.toString());
    switchTab(tab);

    await closeMainWindow({ clearRootSearch: true, popToRootType: PopToRootType.Immediate });
  }

  return <Action title="Open Tab" icon={{ source: Icon.Eye }} onAction={handleAction} />;
}

function OpenNewTabAction(props: { query: string }) {
  async function handleAction() {
    openNewTab(props.query);

    await closeMainWindow({ clearRootSearch: true, popToRootType: PopToRootType.Immediate });
  }

  return <Action onAction={handleAction} title={props.query ? `Search "${props.query}"` : "Open Empty Tab"} />;
}
