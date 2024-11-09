import { Router } from "express";
import { getProfile, signup, signout, signin } from "../../controllers/user";
import { isAuthenticated } from "../../middleware/user";

const userRouter = Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.get("/signout", isAuthenticated, signout);

userRouter.get("/profile", isAuthenticated, getProfile);

export default userRouter;
