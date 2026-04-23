import { config as loadEnv } from "dotenv";
import path from "node:path";

// Local-mode only needs the tunnel. `browserstack-local` has no types —
// declare the surface we actually use.
type BrowserStackLocal = {
  start(options: Record<string, unknown>, cb: (err?: Error) => void): void;
  stop(cb: (err?: Error) => void): void;
  isRunning(): boolean;
};

loadEnv({ path: path.resolve(__dirname, "../../.env.local") });

export default async function globalSetup(): Promise<(() => Promise<void>) | void> {
  if (process.env.LOCAL !== "1") return;

  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("LOCAL=1 requires BROWSERSTACK_ACCESS_KEY in env.");
  }

  const identifier = `bright-speaker-${process.pid}`;
  process.env.BROWSERSTACK_LOCAL_IDENTIFIER = identifier;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Local } = require("browserstack-local") as { Local: new () => BrowserStackLocal };
  const local = new Local();

  await new Promise<void>((resolve, reject) => {
    local.start({ key: accessKey, localIdentifier: identifier, forceLocal: true }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Callback resolve alone is flaky in practice — poll isRunning until
  // the tunnel actually answers.
  const deadline = Date.now() + 30_000;
  while (!local.isRunning() && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!local.isRunning()) {
    throw new Error("BrowserStack Local did not reach running state within 30s.");
  }

  return async () => {
    await new Promise<void>((resolve) => {
      local.stop(() => resolve());
    });
  };
}
