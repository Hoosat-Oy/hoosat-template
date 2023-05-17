import { IncomingMessage, ServerResponse } from "http";
import { RequestHandler } from "../../@types/hoosat-template";

/**
 * Creates a CORS middleware that sets the appropriate headers for Cross-Origin Resource Sharing (CORS).
 *
 * @param {string} origin - The allowed origin for CORS requests.
 * @param {string} methods - The allowed HTTP methods for CORS requests.
 * @returns {RequestHandler} The CORS middleware.
 */
export const cors = (origin: string, methods: string) => {
  /**
   * A request handler function.
   *
   * @callback RequestHandler
   * @param {IncomingMessage} req - The incoming request object.
   * @param {ServerResponse} res - The server response object.
   * @param {RequestHandler|undefined} next - The function to call to proceed to the next middleware or route handler.
   * @returns {void}
   */
  return (req: IncomingMessage, res: ServerResponse, next?: RequestHandler) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next && next(req, res);
  };
};
