import express from "express";
import { router } from "./routes/v1";
import client from "@repo/db/client";

const app = express();
const port = process.env.PORT || 3001;

app.use("/api/v1", router);

app.listen(port, () => {
  console.log("connection to http server sucess at port", port);
});
