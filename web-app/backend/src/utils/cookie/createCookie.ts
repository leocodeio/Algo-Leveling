import { Request, Response } from "express";
import { ResponseData } from "../../types";

export const createCookie = (
  req: Request,
  res: Response,
  token: string,
  responseData: ResponseData
): void => {
  res
    .status(200)
    .cookie("Authorization", token, {
      httpOnly: false, // Change to false so JavaScript can access it
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
    .json(responseData);
};