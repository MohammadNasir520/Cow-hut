import { NextFunction, Request, Response } from "express";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../../interfaces/common";
import { HandleValidationError } from "../../errors/HandleValidationError";
import { handleCastError } from "../../errors/handleCastError";
import ApiError from "../../errors/ApiError";

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
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(400).json({
    message,
    statusCode,
    errorMessage,
    stack: error?.stack,
  });
  next();
};
