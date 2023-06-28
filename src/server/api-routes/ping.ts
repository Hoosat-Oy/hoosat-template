import { createRouter } from "../core/server";

const pingRouter = createRouter();

pingRouter.Get("/api/ping/:id", (req, res) => {
  res.status(200).send(`pong! ${req.params['id']}`);
});

pingRouter.Get("/api/ping/", (_req, res) => {
  res.status(200).send(`pong!`);
});


export { pingRouter }
