import { Request, Response } from 'express';

export const ErrorHandler = (req: Request, res: Response, error: unknown) => {
  if (typeof error === "object" && error !== null) {
    return res.status(500).json({ result: "error", request: req, response: res, message: error.toString() });
  } else {
    return res.status(500).json({ result: "error", request: req, response: res, message: "Unknown error" });
  }
} 