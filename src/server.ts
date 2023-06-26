import mongoose from "mongoose";
import app from "./app";
const port = 5000;
async function bootstrap() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/cow-hut`);
  console.log("database is connected");

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}
bootstrap();
