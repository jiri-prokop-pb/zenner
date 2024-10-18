package models

type Tabs struct {
	Items []Tab `json:"data"`
}

type Tab struct {
	Id           int64  `json:"id"`
	Index        int64  `json:"index"`
	WindowId     int64  `json:"windowId"`
	Title        string `json:"title"`
	Pinned       bool   `json:"pinned"`
	Url          string `json:"url"`
	FaviconUrl   string `json:"faviconUrl"`
	LastAccessed int64 `json:"lastAccessed"`
	Active       bool   `json:"active"`
}
