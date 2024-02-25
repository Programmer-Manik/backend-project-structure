import { ZodError } from "zod";
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleZodError = (error: ZodError): TErrorResponse => {
  const issues: TErrorIssue[] = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    success: false,
    statusCode: 400,
    message: "Validation Error!",
    issues,
  };
};

export default handleZodError;
