import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http-exceptions";

export const errorMiddleware: ErrorRequestHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).send({
    message: error.message,
    status: error.status,
  });
};
