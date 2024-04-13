import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import APIError from "../errors/apiError";

export default class ErrorMiddleware {
  public static errorHandler: ErrorRequestHandler = (
    err: APIError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(err.httpStatusCode).send({ error: err });
  };
}
