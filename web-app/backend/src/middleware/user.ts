import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/token/validateToken";

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Authorization } = req.cookies;
  if (!Authorization) {
    res.status(401).json({
      message: "You are not signed in",
    });
    return;
  }

  const decoded = validateToken(Authorization);
  req.userId = decoded.id;
  next();
};
