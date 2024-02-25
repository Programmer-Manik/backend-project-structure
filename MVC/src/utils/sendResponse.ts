import { Response } from "express";

type TSuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T | T[] | null;
};

const sendSuccessResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};

export default sendSuccessResponse;
