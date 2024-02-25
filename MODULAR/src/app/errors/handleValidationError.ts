import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../types/error";

const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
