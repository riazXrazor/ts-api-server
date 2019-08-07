import chalk from "chalk";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";
import { generateOpenAPISpec } from "./openapi-spec";

/**
 * Generates the client library for the UI
 */
export const genClient = async () => {
  const timer = new Timer();
  await generateOpenAPISpec();
  log(chalk.greenBright(`✓ Generated Client (${timer.elapsed()}ms)`));
};
