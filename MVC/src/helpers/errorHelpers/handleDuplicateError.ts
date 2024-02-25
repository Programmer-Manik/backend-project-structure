import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleDuplicateError = (error: any): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: "",
      message: `Duplicate Value ${Object.values(error.keyValue)[0]}`,
    },
  ];

  return {
    success: false,
    statusCode: 409,
    message: "Duplicate Error!",
    issues,
  };
};

export default handleDuplicateError;
