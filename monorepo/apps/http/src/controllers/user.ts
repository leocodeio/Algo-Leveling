import { loginSchema, signupSchema } from "../types/index";
import client from "@repo/db/client";
import { compare, hash } from "../utils/crypt/mycrypt";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const signupData = signupSchema.safeParse(req.body);
    if (!signupData.success) {
      res.status(400).json({
        error: "Validation failed",
        details: signupData.error.errors,
      });
      return;
    }

    const { email, username, password } = signupData.data;
    const user = await client.user.findFirst({
      where: { email },
    });

    if (user) {
      res.status(409).json({
        error: "Account already exists",
        message: "An account with this email already exists",
      });
      return;
    }

    const hashedPassword = await hash(password);
    const newUser = await client.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred during signup",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = loginSchema.safeParse(req.body);
    if (!loginData.success) {
      res.status(400).json({
        error: "Validation failed",
        details: loginData.error.errors,
      });
      return;
    }

    const { email, password } = loginData.data;
    const user = await client.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "No user found with the provided email",
      });
      return;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "The provided password is incorrect",
      });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred during login",
    });
  }
};
