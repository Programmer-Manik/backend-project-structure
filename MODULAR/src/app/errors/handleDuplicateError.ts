import { TErrorSources, TGenericErrorResponse } from "../types/error";

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = 400;

  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exits`,
    },
  ];

  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

export default handleDuplicateError;
