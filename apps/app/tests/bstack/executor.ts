import type { Page } from "@playwright/test";

/**
 * Reports test outcome back to BrowserStack so the dashboard shows
 * named, pass/fail-annotated sessions instead of "Untitled / unmarked".
 *
 * Uses the `browserstack_executor` CDP passthrough — the string argument
 * to `page.evaluate` is intercepted by BrowserStack's proxy and never
 * reaches the page.
 */
async function execute(page: Page, payload: Record<string, unknown>): Promise<void> {
  try {
    await page.evaluate(
      () => undefined,
      `browserstack_executor: ${JSON.stringify(payload)}`,
    );
  } catch {
    // Session may already be torn down (e.g. page closed). Swallow —
    // we don't want reporting errors to mask real test failures.
  }
}

export async function reportSessionName(page: Page, name: string): Promise<void> {
  await execute(page, { action: "setSessionName", arguments: { name } });
}

export async function reportSessionStatus(
  page: Page,
  status: "passed" | "failed",
  reason: string,
): Promise<void> {
  await execute(page, { action: "setSessionStatus", arguments: { status, reason } });
}
