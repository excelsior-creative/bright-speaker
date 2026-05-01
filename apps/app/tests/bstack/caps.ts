import { execSync } from "node:child_process";

export type BStackProject = {
  /** Stable slug used as the Playwright project name. Kept in sync with §2.3 rows in LAUNCH_CHECKLIST.md. */
  name:
    | "chromebook-chrome"
    | "ipad-safari"
    | "windows-edge"
    | "mac-chrome"
    | "mac-firefox";
  /** W3C capabilities merged into the BrowserStack CDP cap payload. */
  caps: Record<string, unknown>;
  /**
   * Per-project feature flags the smoke spec reads. Avoids sprinkling
   * `project.name === "..."` branches through the test body.
   */
  contract: {
    /** Whether `window.SpeechRecognition || window.webkitSpeechRecognition` is expected to exist. */
    webSpeechApi: boolean;
  };
};

const CHROMIUM_FAKE_MEDIA_FLAGS = [
  "--use-fake-device-for-media-stream",
  "--use-fake-ui-for-media-stream",
];

export const projects: BStackProject[] = [
  {
    name: "chromebook-chrome",
    caps: {
      browserName: "Chrome",
      browserVersion: "latest",
      "bstack:options": { os: "OS X", osVersion: "Sonoma" },
      "goog:chromeOptions": { args: CHROMIUM_FAKE_MEDIA_FLAGS },
    },
    contract: { webSpeechApi: true },
  },
  {
    name: "ipad-safari",
    caps: {
      browserName: "safari",
      "bstack:options": {
        deviceName: "iPad Pro 12.9 2022",
        osVersion: "17",
        realMobile: "true",
      },
    },
    contract: { webSpeechApi: true },
  },
  {
    name: "windows-edge",
    caps: {
      browserName: "Edge",
      browserVersion: "latest",
      "bstack:options": { os: "Windows", osVersion: "11" },
      "ms:edgeOptions": { args: CHROMIUM_FAKE_MEDIA_FLAGS },
    },
    contract: { webSpeechApi: true },
  },
  {
    name: "mac-chrome",
    caps: {
      browserName: "Chrome",
      browserVersion: "latest",
      "bstack:options": { os: "OS X", osVersion: "Sonoma" },
      "goog:chromeOptions": { args: CHROMIUM_FAKE_MEDIA_FLAGS },
    },
    contract: { webSpeechApi: true },
  },
  {
    name: "mac-firefox",
    caps: {
      browserName: "Firefox",
      browserVersion: "latest",
      "bstack:options": { os: "OS X", osVersion: "Sonoma" },
    },
    contract: { webSpeechApi: false },
  },
];

export function getBuildName(): string {
  if (process.env.GITHUB_SHA) return `bright-speaker-${process.env.GITHUB_SHA.slice(0, 7)}`;
  try {
    const sha = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
    return `bright-speaker-${sha}`;
  } catch {
    return `bright-speaker-local-${Date.now()}`;
  }
}

export const PROJECT_NAME = "bright-speaker";
