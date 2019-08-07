import chokidar from "chokidar";
import { genClient } from "./steps/gen-client";
import { generateExpressRoutes } from "./steps/gen-routes";
import { registerQuitKey } from "./steps/register-quit-key";
import { startApi } from "./steps/start-api";
import { debounce } from "./utils/debounce";

/**
 * Single to run API server and regenerate route-related content
 */

(async () => {
  await Promise.all([
    genClient(),
    generateExpressRoutes().then(() => startApi())
  ]);

  const regenerateApiRoutes = debounce(async (args) => {
    const routesChanged =
      args.indexOf("server.ts") !== -1 ||
      args.indexOf("api/controllers") !== -1;

    if (routesChanged) {
      await Promise.all([genClient(), generateExpressRoutes()]);
    } else {
      await startApi();
    }
  }, 100);

  chokidar.watch("./api/**/*.ts").on("change", regenerateApiRoutes);

  registerQuitKey();
})();
