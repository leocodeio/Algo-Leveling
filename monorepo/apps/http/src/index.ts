import express from "express";
import { userRouter } from "./routes/v1/user";

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use("/user/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("connection to http server sucess at port", port);
});
