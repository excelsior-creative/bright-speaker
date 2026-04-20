---
name: bstack
description: Run Bright Speaker's `/speak` flow on BrowserStack across the supported browser matrix (Chromebook Chrome, iPad Safari, Windows Edge, Mac Chrome, Mac Firefox). Use when the user asks to test cross-browser, reproduce a browser-specific bug, validate the launch checklist's "browser support matrix" item, or generate BrowserStack capabilities/Live URLs.
argument-hint> [live|local|matrix|smoke] [target-url?]
allowed-tools: Bash(curl:*), Bash(open:*), Bash(npx browserstack-local*), Bash(BROWSERSTACK_LOCAL_*), Read, Write, Edit
---

# /bstack — BrowserStack cross-browser testing for Bright Speaker

Bright Speaker must run on Chromebooks, iPads, and Mac/Windows laptops (see
`PRD.md` and `LAUNCH_CHECKLIST.md` §2.3). The app's risky surface area is
`/speak`: `getUserMedia` (camera + mic), `face-api.js` (TensorFlow.js +
WebGL/WebGPU), and the Web Speech API (Chromium/Safari only). This skill
drives manual and scripted BrowserStack runs against that surface.

## Required env

```
BROWSERSTACK_USERNAME=...
BROWSERSTACK_ACCESS_KEY=...
```

If either is missing, ask the user for credentials before continuing — do **not**
write them to a tracked file. `.env.local` is gitignored; that's the right home.

## Modes

The first argument selects the workflow:

| Mode | When to use |
|------|------|
| `live` (default) | Open BrowserStack Live in a browser for ad-hoc manual testing of one device |
| `local` | Start the BrowserStack Local tunnel so a session can hit `http://localhost:3000` |
| `matrix` | Print/generate the full supported-browser capability matrix (for Playwright/WebdriverIO) |
| `smoke` | Walk through the manual smoke checklist below on each matrix entry |

The second argument is the target URL. Defaults to `http://localhost:3000/speak?prompt=1`
(matches `LAUNCH_CHECKLIST.md` line 90). For production runs use the deployed URL.

## Browser matrix

Authoritative list lives in [browser-matrix.md](browser-matrix.md). It mirrors
`LAUNCH_CHECKLIST.md` §2.3 — keep them in sync. When generating capabilities,
read that file rather than hard-coding device names.

## Camera + mic on BrowserStack

`getUserMedia` will prompt for permission inside the BrowserStack session.
Two important caveats to surface to the user when they ask about audio/video:

1. **No real webcam.** BrowserStack devices have no physical camera. Chrome
   sessions can be launched with `--use-fake-device-for-media-stream` and
   `--use-fake-ui-for-media-stream` via `goog:chromeOptions.args` — this lets
   `getUserMedia` resolve with a synthetic stream. Without those flags, the
   `/speak` flow will hit our `NotFoundError` path (`apps/app/src/app/speak/page.tsx:152`).
2. **Web Speech API on Safari/iOS** requires the user to tap "Allow" once; on
   BrowserStack iOS Live this is a real tap inside the session window.

For automated runs we recommend a Playwright project pinned to Chromium with
the fake-device flags; for "does it visually work on iPad Safari?" use Live.

## Workflows

### `live` (default)

1. Confirm `BROWSERSTACK_USERNAME` / `BROWSERSTACK_ACCESS_KEY` are set.
2. If the target URL is `localhost:*`, kick off the `local` workflow first.
3. Build a Live URL of the form
   `https://live.browserstack.com/dashboard#os=<os>&os_version=<v>&browser=<b>&browser_version=<bv>&url=<encoded>`
   (or device equivalent). For a single ask, default to **Chromebook Chrome
   latest** since that's the primary user.
4. Print the URL. Do **not** auto-open unless the user asks — they may be on a
   headless box.

### `local`

1. Check whether `BrowserStackLocal` is on PATH (`which BrowserStackLocal`) or
   a `browserstack-local` npm dep exists. If neither, instruct the user to run
   `npm i -D browserstack-local` and re-run.
2. Start the tunnel in the background:
   ```
   BrowserStackLocal --key "$BROWSERSTACK_ACCESS_KEY" --local-identifier bright-speaker-dev
   ```
3. Confirm the tunnel is up by tailing its log; report the local-identifier
   the user must put into capabilities (`bstack:options.localIdentifier`).
4. Remind the user to stop the tunnel when done (`pkill BrowserStackLocal`).

### `matrix`

Read `browser-matrix.md` and emit a JSON array of W3C-compliant capabilities,
one entry per row. Use the `bstack:options` namespace and include
`projectName: "bright-speaker"`, `buildName` from the current git sha, and
`sessionName` from the row's friendly label. Offer the user a paste-ready
Playwright `projects` block on request.

### `smoke`

Walk the user through the manual smoke list against each matrix row:

- [ ] `/` loads, hero renders, no console errors
- [ ] Click "Start a 60-second prompt" → land on `/speak?prompt=1`
- [ ] Camera + mic permission prompts appear
- [ ] Live transcript region populates (Chromium/Safari) **or** the
      browser-compat banner shows (Firefox — see checklist §2.3)
- [ ] Eye-contact pill toggles when face moves out of frame
- [ ] "Done" returns to results screen with non-zero scores
- [ ] No layout shift / clipped UI on small Chromebook viewports (1366×768)

Record pass/fail per row in a markdown table the user can paste into the
checklist.

## Don't

- Don't commit `BROWSERSTACK_ACCESS_KEY`. If you see it in a diff, refuse the commit.
- Don't expand the matrix beyond what `LAUNCH_CHECKLIST.md` §2.3 lists without
  asking — sessions cost money and noise hides real regressions.
- Don't use `bstack:options.networkLogs: true` by default; it captures the
  Web Speech API audio stream sent to Google. Only enable when the user is
  explicitly debugging a network issue.
