import { Request, Response } from "express";
import { ResponseData } from "../../types";

export const destroyCookie = (
  req: Request,
  res: Response,
  responseData: ResponseData
): void => {
  res
    .status(200)
    .clearCookie("Authorization", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })
    .json(responseData);
};
