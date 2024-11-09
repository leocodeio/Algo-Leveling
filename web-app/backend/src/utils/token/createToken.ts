import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types";

export const createToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};
