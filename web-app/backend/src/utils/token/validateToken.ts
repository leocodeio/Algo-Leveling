import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types";

export const validateToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};
