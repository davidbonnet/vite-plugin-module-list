import express from "express";
import { createServer as createViteServer } from "vite";

import { logger } from "./logger.ts";
import { requestLogger } from "./middlewares/requestLogger.ts";

async function main(
  port = process.env.PORT ?? "5173",
  hostname = process.env.HOSTNAME ?? "",
  production = process.env.NODE_ENV === "production",
  hmrPort = process.env.HMR_PORT ?? "3000",
) {
  const app = express();

  app.use(requestLogger);

  app.get("/setup", (_, response) => {
    response.json({
      projectName: "Foundation",
    });
  });

  if (production) {
    app.use(express.static("public"));
    logger.info(`Server listening on http://${hostname}:${port}`);
  } else {
    const vite = await createViteServer({
      appType: "spa",
      server: {
        hmr: { port: hmrPort == null ? undefined : +hmrPort },
        middlewareMode: true,
      },
    });
    app.use(vite.middlewares);
    logger.info(
      `Using development server listening on http://localhost:${port} and hot module reload on ws://localhost:${hmrPort}`,
    );
  }

  app.listen(+port, hostname);
}

main();
