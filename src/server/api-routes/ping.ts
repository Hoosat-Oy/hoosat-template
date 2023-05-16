import { createRouter } from "../core/server";

const pingRouter = createRouter();

pingRouter.Get("/api/ping", (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('pong!');
});

export { pingRouter }
