import type { BStackProject } from "./caps";
import { PROJECT_NAME, getBuildName } from "./caps";

/**
 * Builds the Playwright CDP endpoint for a BrowserStack session.
 *
 * Shared `bstack:options` — credentials, project/build/session naming,
 * the tunnel identifier (when LOCAL=1) — are merged on top of the
 * project-specific caps from caps.ts. The merged payload is base64-
 * encoded and appended to the CDP URL.
 *
 * Playwright's `use.launchOptions` is ignored on remote CDP connects;
 * browser flags must live in the caps (goog:chromeOptions / ms:edgeOptions).
 */
export function wsEndpoint(project: BStackProject): string {
  const userName = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
  if (!userName || !accessKey) {
    throw new Error(
      "BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set (see apps/app/.env.local).",
    );
  }

  const sharedBstackOptions: Record<string, unknown> = {
    userName,
    accessKey,
    projectName: PROJECT_NAME,
    buildName: getBuildName(),
    sessionName: project.name,
  };

  if (process.env.LOCAL === "1") {
    sharedBstackOptions.local = "true";
    sharedBstackOptions.localIdentifier =
      process.env.BROWSERSTACK_LOCAL_IDENTIFIER ?? `bright-speaker-${process.pid}`;
  }

  const projectBstackOptions = (project.caps["bstack:options"] as Record<string, unknown> | undefined) ?? {};
  const mergedCaps = {
    ...project.caps,
    "bstack:options": { ...sharedBstackOptions, ...projectBstackOptions },
  };

  const encoded = Buffer.from(JSON.stringify(mergedCaps)).toString("base64");
  return `wss://cdp.browserstack.com/playwright?caps=${encoded}`;
}
