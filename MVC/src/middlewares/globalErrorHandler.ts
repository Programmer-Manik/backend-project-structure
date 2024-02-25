import { ErrorRequestHandler } from "express";
import config from "../config";
import errorPreprocessor from "../helpers/errorHelpers/errorPreprocessor";
import { TErrorResponse } from "../types/TErrorResponse";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // initial fallback error response
  let errorResponse: TErrorResponse = {
    success: false,
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong!",
    issues: error.issues || [],
  };

  // error preprocessor
  errorResponse = errorPreprocessor(error);

  // final response
  res.status(errorResponse.statusCode).json({
    success: errorResponse.success,
    message: errorResponse.message,
    issues: errorResponse.issues,
    stack: config.node_dev === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
