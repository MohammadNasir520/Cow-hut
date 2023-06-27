import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
const port = 5000;

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/cow-hut`);
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
