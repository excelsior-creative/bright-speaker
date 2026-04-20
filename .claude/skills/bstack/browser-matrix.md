# Bright Speaker — BrowserStack support matrix

Mirrors `LAUNCH_CHECKLIST.md` §2.3 ("Browser support matrix"). When that
section changes, update this file in the same commit.

| Row | OS | OS version | Browser / Device | Notes |
|-----|----|------------|------------------|-------|
| `chromebook-chrome` | Chrome OS (proxied) | latest | Chrome (latest) on `Samsung Galaxy Chromebook` | Primary user. Web Speech API + getUserMedia both supported. Use Chrome capability with `bstack:options.osVersion` matching latest stable. |
| `ipad-safari` | iOS | 17 | Mobile Safari on `iPad Pro 12.9 2022` | Web Speech API works since iOS 14.5 but requires user gesture. Face-api perf is acceptable on M-series iPads, marginal on older. |
| `windows-edge` | Windows | 11 | Edge (latest) | Chromium-based — should match Chrome behavior. Confirm camera permission UI copy. |
| `mac-chrome` | OS X | Sonoma | Chrome (latest) | Dev-baseline; if this fails, every other row will too. |
| `mac-firefox` | OS X | Sonoma | Firefox (latest) | **No** Web Speech API. Confirm the compat banner from `LAUNCH_CHECKLIST.md` §2.3 fires here. |

## W3C capability fragments

Use these as the per-project starting point. Merge with shared
`bstack:options` (`projectName`, `buildName`, `sessionName`,
`localIdentifier`).

### chromebook-chrome
```json
{
  "browserName": "Chrome",
  "browserVersion": "latest",
  "bstack:options": { "os": "OS X", "osVersion": "Sonoma", "deviceName": null },
  "goog:chromeOptions": {
    "args": ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"]
  }
}
```
> BrowserStack does not expose Chrome OS as a desktop OS target; the closest
> fidelity is Chrome-latest on a recent OS with the same viewport
> (1366×768) and Chrome version a Chromebook would actually ship.

### ipad-safari
```json
{
  "browserName": "safari",
  "bstack:options": { "deviceName": "iPad Pro 12.9 2022", "osVersion": "17", "realMobile": "true" }
}
```

### windows-edge
```json
{
  "browserName": "Edge",
  "browserVersion": "latest",
  "bstack:options": { "os": "Windows", "osVersion": "11" }
}
```

### mac-chrome
```json
{
  "browserName": "Chrome",
  "browserVersion": "latest",
  "bstack:options": { "os": "OS X", "osVersion": "Sonoma" },
  "goog:chromeOptions": {
    "args": ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"]
  }
}
```

### mac-firefox
```json
{
  "browserName": "Firefox",
  "browserVersion": "latest",
  "bstack:options": { "os": "OS X", "osVersion": "Sonoma" }
}
```
