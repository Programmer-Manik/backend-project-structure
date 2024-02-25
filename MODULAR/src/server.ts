import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let SERVER: Server;
// main server: database connection
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    SERVER = app.listen(config.port, () => {
      console.log(`Server is Running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
server();

// unhandledRejection
process.on("unhandledRejection", () => {
  console.log("unhandledRejection on is detected, shutting down!");
  if (SERVER) {
    SERVER.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaughtException
process.on("uncaughtException", () => {
  console.log("uncaughtException on is detected, shutting down!");
  process.exit(1);
});
