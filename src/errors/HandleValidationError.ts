import mongoose from "mongoose";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/common";

export const HandleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors = Object.values(error.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "mongoose validation error",
    errorMessage: errors,
  };
};
