import { Router } from "express";

export const router = Router();

router.get("/signup", (req, res) => {
  console.log("singup sucess");
  res.send("this is perfect");
});
