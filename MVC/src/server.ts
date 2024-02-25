import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const server = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server is Running: http://localhost:${config.port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
server();
