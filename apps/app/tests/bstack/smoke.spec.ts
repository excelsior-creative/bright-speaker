import { test, expect } from "@playwright/test";
import { projects } from "./caps";
import { reportSessionName, reportSessionStatus } from "./executor";

type Contract = (typeof projects)[number]["contract"];

function contractFor(name: string): Contract {
  const match = projects.find((p) => p.name === name);
  if (!match) throw new Error(`Unknown project '${name}'. Add it to caps.ts.`);
  return match.contract;
}

test.describe("@smoke bright-speaker cross-browser smoke", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await reportSessionName(page, `${testInfo.project.name} · ${testInfo.title}`);
  });

  test.afterEach(async ({ page }, testInfo) => {
    const status = testInfo.status === testInfo.expectedStatus ? "passed" : "failed";
    await reportSessionStatus(page, status, testInfo.error?.message ?? "ok");
  });

  test("home renders without page errors", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    const response = await page.goto("/");
    expect(response?.ok(), "home must return a 2xx response").toBe(true);
    await expect(page).toHaveTitle(/Bright Speaker/i);
    expect(pageErrors, "no uncaught page errors on /").toEqual([]);
  });

  test("/speak exposes mediaDevices.getUserMedia", async ({ page }) => {
    await page.goto("/speak?prompt=1");
    const hasGUM = await page.evaluate(
      () =>
        "mediaDevices" in navigator &&
        typeof navigator.mediaDevices.getUserMedia === "function",
    );
    expect(hasGUM, "every supported browser must expose getUserMedia").toBe(true);
  });

  test("web speech capability contract matches caps.ts", async ({ page }, testInfo) => {
    await page.goto("/speak?prompt=1");
    const hasSpeech = await page.evaluate(
      () => "SpeechRecognition" in window || "webkitSpeechRecognition" in window,
    );
    const { webSpeechApi: expected } = contractFor(testInfo.project.name);
    expect(
      hasSpeech,
      expected
        ? `${testInfo.project.name} should expose SpeechRecognition`
        : // When §2.3's compat banner ships, tighten this branch to assert
          // the banner is visible instead of just the negative API contract.
          `${testInfo.project.name} should NOT expose SpeechRecognition (triggers banner path)`,
    ).toBe(expected);
  });
});
