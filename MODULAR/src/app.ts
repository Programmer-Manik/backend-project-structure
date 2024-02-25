import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes/router";

// express app instance
const app: Application = express();

// application middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(cookieParser());

// application routes
app.use("/api/v1", router);

// error handling
app.use(globalErrorHandler);
// app.use(notFound);

// health checking
app.get("/", (req: Request, res: Response) => {
  // Promise.reject();
  res.status(200).send("All is Well");
});

export default app;
