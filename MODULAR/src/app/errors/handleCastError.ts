import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../types/error";

const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};
export default handleCastError;
