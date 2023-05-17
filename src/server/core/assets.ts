
import fs from 'fs';
import path from "path";
import { IncomingMessage, ServerResponse } from "http";
import { RequestHandler } from "../../@types/hoosat-template";

/**
 * Creates a middleware for serving static assets from a specified public directory.
 *
 * @param {string} publicPath - The path to the public directory where the assets are located.
 * @returns {RequestHandler} The assets middleware.
 */
export const assets = (publicPath: string): RequestHandler => {
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
    const filePath = path.join(publicPath, req.url || '');
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('open', () => {
      res.setHeader('Content-Type', 'text/html'); 
      fileStream.pipe(res);
    });
    fileStream.on('error', (err) => {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT' || (err as NodeJS.ErrnoException).code === 'EISDIR') {
        next && next(req, res);
      } else {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  };
};