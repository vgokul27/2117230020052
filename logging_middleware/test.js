import { Log } from "./logger.js";

async function test() {

  const result = await Log(
    "frontend",
    "info",
    "component",
    "Logger working successfully"
  );

  console.log(result);
}

test();