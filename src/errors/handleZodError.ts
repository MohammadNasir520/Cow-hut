import { ZodError, ZodIssue } from "zod";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/common";
export const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((el: ZodIssue) => {
    return {
      path: el.path[el.path.length - 1],
      message: el.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation error",
    errorMessage: errors,
  };
};
