import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./config/index";
const port = 5000;

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database is connected");

    server = app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log("fail to connect database", error);
  }

  process.on("unhandledRejection", (error) => {
    console.log(
      `Un handled Rejection is detected . we are closing our server.......`,
      error
    );
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();
