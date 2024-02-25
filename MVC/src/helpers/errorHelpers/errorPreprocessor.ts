import mongoose from "mongoose";
import { ZodError } from "zod";
import AppError from "./handleAppError";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import handleGenericError from "./handleGenericError";
import handleValidationError from "./handleValidationError";
import handleZodError from "./handleZodError";

const errorPreprocessor = (error: any) => {
  // 1. Type: handleZodError
  if (error instanceof ZodError) {
    return handleZodError(error);
  }
  // 2. Type: handleValidationError
  else if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(error);
  }
  // 3. Type: handleDuplicateError
  else if (error.code && error.code === 11000) {
    return handleDuplicateError(error);
  }
  // 4. Type: handleCastError
  else if (error instanceof mongoose.Error.CastError) {
    return handleCastError(error);
  }
  // 5. Type: AppError
  else if (error instanceof AppError) {
    return handleGenericError(error);
  }
  // 6. Type: Error
  else {
    return {
      statusCode: 500,
      success: false,
      message: "Unknown Error",
      issues: [
        {
          path: "",
          message: error.message,
        },
      ],
    };
  }
};

export default errorPreprocessor;
