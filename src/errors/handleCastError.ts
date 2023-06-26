import mongoose from "mongoose";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/common";

export const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: "in valid _id. please check again",
    errorMessage: errors,
  };
};
