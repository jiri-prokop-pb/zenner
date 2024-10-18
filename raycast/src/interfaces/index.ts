import { Icon, Image } from "@raycast/api";
import { ReactNode } from "react";

export interface Preferences {
  readonly searchEngine: string;
}

export class Tab {
  constructor(
    public readonly id: number,
    public readonly index: number,
    public readonly pinned: boolean,
    public readonly windowId: number,
    public readonly title: string,
    public readonly url: string,
    public readonly faviconUrl: string,
    public readonly lastAccessed: number,
    public readonly active: boolean,
  ) {}

  get domain(): string {
    if (this.url === "") {
      return "";
    }

    const url = new URL(this.url);

    return url.hostname !== "" ? url.hostname.replace("www.", "") : this.url;
  }

  get favicon(): Image.ImageLike {
    return { source: this.faviconUrl, fallback: Icon.Globe };
  }

  toJSON() {
    return {
      id: this.id,
      index: this.index,
      pinned: this.pinned,
      windowId: this.windowId,
      title: this.title,
      url: this.url,
      faviconUrl: this.faviconUrl,
      lastAccessed: this.lastAccessed,
      active: this.active,
      domain: this.domain,
      favicon: this.favicon,
    };
  }
}

export interface ZennerTab {
  id: number;
  index: number;
  windowId: number;
  pinned: boolean;
  title: string;
  url: string;
  faviconUrl: string;
  lastAccessed: number;
  active: boolean;
}

export interface TabState {
  tabs: Tab[];
}

export interface SearchResult<T> {
  data: T;
  errorView?: ReactNode;
  isLoading: boolean;
}
