import { HoosatRequest, HoosatRequestHandler, HoosatResponse } from "../../@types";

/**
 * Creates a CORS middleware that sets the appropriate headers for Cross-Origin Resource Sharing (CORS).
 *
 * @param {string} origin - The allowed origin for CORS requests.
 * @param {string} methods - The allowed HTTP methods for CORS requests.
 * @returns {HoosatRequestHandler} The CORS middleware.
 */
export const cors = (origin: string, methods: string): HoosatRequestHandler => {
  /**
   * Handles the CORS middleware.
   *
   * @callback HoosatRequestHandler
   * @param {HoosatRequest} req - The incoming request object.
   * @param {HoosatResponse} res - The server response object.
   * @param {HoosatRequestHandler|undefined} next - The function to call to proceed to the next middleware or route handler.
   * @returns {void}
   */
  return (req: HoosatRequest, res: HoosatResponse, next?: HoosatRequestHandler) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', methods);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next && next(req, res);
  };
};
