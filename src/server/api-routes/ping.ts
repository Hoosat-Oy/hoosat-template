/**
 * This example API route for pinging if the API server is live.
 */
import express, { Request, Response } from "express";
import { ErrorHandler } from "../core/express-errors";

const ping = express.Router();

ping.get("/ping", (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "pong" });
  } catch (error) {
    return ErrorHandler(req, res, error);
  }
})

export { ping }
