import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";
import AppError from "./handleAppError";

const handleGenericError = (error: AppError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: "",
      message: error.message,
    },
  ];

  return {
    success: false,
    statusCode: error.statusCode,
    message: "App Error!",
    issues,
  };
};

export default handleGenericError;
