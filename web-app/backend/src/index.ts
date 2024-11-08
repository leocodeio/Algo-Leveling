import userRouter from "./routes/v1/user";
import judgeRouter from "./routes/v1/judge";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.VITE_FRONTEND_URI }));

app.use("/user/v1", userRouter);
app.use("/judge/v1", judgeRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
