// This is entry point for your API routes.
// In here you ca import all your API routers and app.use all of your API routes, so you don't have to touch index.tsx
// 

import { Express } from "express-serve-static-core";
import { ping } from "./ping";


export const APIRoutes = (app: Express) => {
  app.use("/api", ping);
}