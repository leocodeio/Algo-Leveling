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
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .json(responseData);
};
