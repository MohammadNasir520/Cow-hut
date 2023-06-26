export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string;
  message: string;
};
