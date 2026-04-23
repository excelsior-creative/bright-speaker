import path from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig, type PlaywrightTestConfig } from "@playwright/test";
import { projects as bstackProjects } from "./tests/bstack/caps";
import { wsEndpoint } from "./tests/bstack/wsEndpoint";

loadEnv({ path: path.resolve(__dirname, ".env.local") });

// `bs-local.com` resolves through the BrowserStack Local tunnel on every
// platform; `localhost` silently fails on real iOS devices.
const LOCAL_BASE_URL = "http://bs-local.com:3000";
const DEFAULT_REMOTE_BASE_URL = "https://brightspeaker.com";

const baseURL =
  process.env.LOCAL === "1"
    ? LOCAL_BASE_URL
    : (process.env.BASE_URL ?? DEFAULT_REMOTE_BASE_URL);

const projects: PlaywrightTestConfig["projects"] = bstackProjects.map((project) => ({
  name: project.name,
  use: {
    baseURL,
    connectOptions: { wsEndpoint: wsEndpoint(project) },
    // The CDP URL contains a base64-encoded access key. Trace would
    // persist it to disk; keep it off for bstack projects.
    trace: "off",
    video: "off",
    screenshot: "only-on-failure",
  },
}));

export default defineConfig({
  testDir: "./tests/bstack",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  // Free-tier parallel session limit is 1. More workers produce opaque
  // session-queue timeouts, not useful parallelism.
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  globalSetup: "./tests/bstack/global-setup.ts",
  projects,
});
