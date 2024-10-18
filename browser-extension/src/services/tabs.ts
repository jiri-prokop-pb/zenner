import { Port } from "../models/port"
import { Command } from "../models/command"
import { log } from "../logger"
import { Response } from "../models/response"
import { delay } from "../utils"

export async function newTab(port: Port, { args }: Command) {
  if (!args) { 
    log("open empty tab")
    await browser.tabs.create({})
    return port.postMessage(Response.end()) 
  }

  try {
    const url = new URL(args)
    log("open tab at url: ", url)
    await browser.tabs.create({ url: url.toString() })
  } catch(_) {
    // if not an url, use google
    const url = `https://www.google.com/search?q=${encodeURIComponent(args)}`
    log("open google tab")
    await browser.tabs.create({ url })
  }
  port.postMessage(Response.end());
}

export async function getTabs(port: Port, { command: _cmd }: Command) {
  const tabs = await browser.tabs.query({})

  log("Sending back ", tabs.length, " tabs")
  port.postMessage(Response.data(tabs.map(
    tab => ({
      id: tab.id,
      index: tab.index,
      windowId: tab.windowId,
      title: tab.title,
      pinned: tab.pinned,
      url: tab.url,
      faviconUrl: tab.faviconUrl,
      lastAccessed: tab.lastAccessed,
      active: tab.active
    })
  )));
  // pause 100ms, or this end message may be received before the message above
  await delay(100)
  port.postMessage(Response.end());
}

export async function switchToTab(port: Port, { args }: Command) {
  if (!args) { 
    log("invalid args, received: ", args)
    return port.postMessage(Response.end()) 
  }

  let windowId: number
  let tabId: number
  const ids = args.split(":")

  if (ids.length !== 2) {
    log("invalid args, cannot find both window and tab ids. Received: ", args)
    return port.postMessage(Response.end())
  }

  try {
    windowId = Number.parseInt(ids[0])
    tabId = Number.parseInt(ids[1])
  } catch(e) {
    log("invalid args, cannot parse both window and tab ids as int", args)
    return port.postMessage(Response.end())
  }

  const tabs = await browser.tabs.query({ windowId })

  for (let tab of tabs) {
    if (tab.id === tabId) {
      log("found tab to switch to", tab)
      browser.tabs.update(tab.id!, { active: true });
      break
    }
  }

  port.postMessage(Response.end());
}

export async function closeTabs(port: Port, { args }: Command) {
  if (!args) { 
    log("invalid args, received: ", args)
    return port.postMessage(Response.end()) 
  }

  const tabToCloseIds: number[] = []

  /* 
   * array of strings, each one should have following format: 
   * `{windowId}:{tabId}` 
  */
  const tabIds = args.split(',')

  const tabs = await browser.tabs.query({})

  for (let tab of tabs) {
    if (!tab.id) continue

    if (tabIds.some(id => `${tab.windowId}:${tab.id}` === id)) {
      log("found tab to close", tab)
      tabToCloseIds.push(tab.id)
    }
  }

  log("closing tabs", tabToCloseIds)
  browser.tabs.remove(tabToCloseIds)

  port.postMessage(Response.end());
}
