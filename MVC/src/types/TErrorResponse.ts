export type TErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  issues: TErrorIssue[];
};

export type TErrorIssue = {
  path: string | number;
  message: string;
};
