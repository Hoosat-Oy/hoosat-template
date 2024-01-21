import { createRouter } from "../core/server";
import { pingRouter } from "./ping/ping";

const APIRouter = createRouter();

APIRouter.UseRouter(pingRouter);

export { APIRouter }