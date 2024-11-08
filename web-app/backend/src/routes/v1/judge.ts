import { Router } from "express";
import { executeCode, getLanguages } from "../../controllers/judge";

export const judgeRouter = Router();

judgeRouter.get("/languages", getLanguages);
judgeRouter.post("/execute", executeCode);

export default judgeRouter;
