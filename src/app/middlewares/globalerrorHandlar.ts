import { NextFunction, Request, Response } from "express";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../../interfaces/common";
import { HandleValidationError } from "../../errors/HandleValidationError";

export const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "something went wrong";
  let statusCode = 500;
  let errorMessage: IGenericErrorMessage[] = [];

  if (error.name === "ValidationError") {
    const simplifiedError = HandleValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  }
  res.status(400).json({
    message,
    statusCode,
    errorMessage,
    stack: error?.stack,
  });
  next();
};
