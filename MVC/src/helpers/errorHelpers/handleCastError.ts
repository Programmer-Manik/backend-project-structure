import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleCastError = (error: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    success: false,
    statusCode: 409,
    message: "Cast Error!",
    issues,
  };
};

export default handleCastError;
