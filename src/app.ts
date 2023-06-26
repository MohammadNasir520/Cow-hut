import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./app/modules/user/user.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// use router
app.use("/api/v1/", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("cow hut server is running");
});

export default app;
