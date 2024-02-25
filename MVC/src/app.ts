import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import globalRouter from "./routers/router";

// express app instance
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes
app.use("/api/v1", globalRouter);

// health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Welcome to MVC Pattern",
  });
});

// catch all routes
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
