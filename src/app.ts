import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalerrorHandlar";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/// use router
// app.ts --> index.ts-->user.route.ts
app.use("/api/v1/", router);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("cow hut server is running");
});

export default app;
