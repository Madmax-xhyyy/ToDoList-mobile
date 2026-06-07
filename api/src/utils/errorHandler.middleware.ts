import { Request, Response, NextFunction } from "express";
import { AppError } from "./error";
import { logger } from "./logger";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  } else {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
    return;
  }
};