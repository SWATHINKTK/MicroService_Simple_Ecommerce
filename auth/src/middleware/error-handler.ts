import { Request, Response, NextFunction } from "express"; 
import { CustomClass } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof CustomClass) {
    return res.status(err.statusCode).send({
      errors: err.serializeError(),
    });
  }
  res.send('error');
};
