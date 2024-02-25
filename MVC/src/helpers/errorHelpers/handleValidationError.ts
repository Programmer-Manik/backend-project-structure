import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleValidationError = (error: mongoose.Error.ValidationError): TErrorResponse => {
  // convert error.errors object to array
  const errorValues = Object.values(error.errors);
  const issues: TErrorIssue[] = [];
  // filter path and message field
  errorValues.forEach((errorObj) => {
    issues.push({
      path: errorObj.path,
      message: errorObj.message,
    });
  });

  return {
    success: false,
    statusCode: 403,
    message: "Duplicate Error!",
    issues,
  };
};

export default handleValidationError;
