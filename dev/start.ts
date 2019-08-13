import { initializeDbConnection } from "#config/database";
import chokidar from "chokidar";
import dotenv from "dotenv";
import { createControllerImporter } from "./steps/controller-imports";
import { genClient } from "./steps/gen-client";
import { generateExpressRoutes } from "./steps/gen-routes";
import { registerQuitKey } from "./steps/register-quit-key";
import { startApi } from "./steps/start-api";
import { debounce } from "./utils/debounce";
/**
 * Single to run API server and regenerate route-related content
 */
dotenv.config();

createControllerImporter();

(async () => {
  await Promise.all([
    genClient(),
    generateExpressRoutes().then(async () => {
        await startApi();
        await initializeDbConnection();
    }),
  ]);

  const regenerateApiRoutes = debounce(async (args) => {
    const routesChanged =
      args.indexOf("server.ts") !== -1 ||
      args.indexOf("api/controllers") !== -1;

    if (routesChanged) {
      createControllerImporter();
      await Promise.all([genClient(), generateExpressRoutes()]);
    } else {
      await startApi();
      await initializeDbConnection();
    }
  }, 100);

  chokidar.watch("./api/**/*.ts").on("change", regenerateApiRoutes);

  registerQuitKey();
})();
