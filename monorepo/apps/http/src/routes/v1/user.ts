import { Router } from "express";
import { signup } from "../../controllers/user";
export const userRouter = Router();

userRouter.post("/signup", signup);

userRouter.post("/login", (req, res) => {});

userRouter.get("/logout", (req, res) => {});

userRouter.get("/profile", (req, res) => {});
