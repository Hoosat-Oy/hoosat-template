import { IncomingMessage, ServerResponse } from "http";
import { RequestHandler } from "../../@types/hoosat-template";

export const cors = (origin: string, methods: string): RequestHandler => {
  return (req: IncomingMessage, res: ServerResponse, next: RequestHandler | undefined) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next && next(req, res);
  };
};