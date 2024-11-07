// controllers/user.ts
import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(201).send("User signed up successfully");
  } catch (error) {
    res.status(500).send("Error signing up");
  }
};
