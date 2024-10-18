import { Icon, List } from "@raycast/api";
import { ReactElement, useEffect } from "react";
import { COMMAND_NAME } from "./constants";
import { TabActions } from "./components/TabActions";
import { useCachedPromise, useCachedState } from "@raycast/utils";
import { fetchOpenTabs } from "./actions";
import { Tab } from "./interfaces";
import { UnknownError } from "./components/Error";

export default function Command(): ReactElement {
  const {
    isLoading,
    data: tabs,
    revalidate,
    error,
  } = useCachedPromise(async () => fetchOpenTabs(), [], { initialData: [] as Tab[] });
  const [activeTabId, setActiveTabId] = useCachedState<string | undefined>(
    "activeTabId",
    tabs.find((tab) => tab.active)?.id.toString(),
  );

  useEffect(() => {
    if (isLoading) return;

    setActiveTabId(tabs.find((tab) => tab.active)?.id.toString());
  }, [tabs, isLoading]);

  if (error) return <UnknownError />;

  return (
    <List
      key={activeTabId?.toString()}
      isLoading={isLoading}
      throttle={false}
      filtering={{ keepSectionOrder: true }}
      navigationTitle={COMMAND_NAME}
      selectedItemId={activeTabId}
    >
      {tabs.map((tab) => (
        <List.Item
          id={tab.id.toString()}
          key={tab.id}
          title={tab.domain}
          subtitle={tab.title}
          keywords={[tab.domain]}
          actions={<TabActions.OpenTabListItem tab={tab} onOpenTab={setActiveTabId} onCloseTab={revalidate} />}
          icon={tab.favicon}
          accessories={tab.pinned ? [{ icon: Icon.Geopin }] : undefined}
        />
      ))}
    </List>
  );
}
