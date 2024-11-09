import { loginSchema, signupSchema } from "../types/index";
import client from "../db/client";
import { compare, hash } from "../utils/crypt/mycrypt";
import { Request, Response } from "express";
import { createCookie } from "../utils/cookie/createCookie";
import { createToken } from "../utils/token/createToken";
import { destroyCookie } from "../utils/cookie/destroyCookie";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const signupData = signupSchema.safeParse(req.body);
    if (!signupData.success) {
      res.status(400).json({
        message: "Validation failed",
        payload: {
          details: signupData.error.errors,
        },
      });
      return;
    }

    const { email, username, password } = signupData.data;
    const user = await client.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (user) {
      res.status(409).json({
        message: "An account with this email already exists",
        payload: {
          details: "Email already exists",
        },
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
      message: "An unexpected error occurred during signup",
      payload: {
        details: "Internal server error",
      },
    });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = loginSchema.safeParse(req.body);
    if (!loginData.success) {
      res.status(400).json({
        message: "Validation failed",
        payload: {
          details: loginData.error.errors,
        },
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
        payload: {
          details: "No user found with the provided email",
        },
      });
      return;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid credentials",
        payload: {
          details: "The provided password is incorrect",
        },
      });
      return;
    }

    const token = createToken({ id: user.id });
    createCookie(req, res, token, {
      message: "Signin successful",
      payload: {},
    });
  } catch (error: any) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "An unexpected error occurred during login",
      payload: {
        details: "Internal server error",
      },
    });
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  destroyCookie(req, res, {
    message: "Signout successful",
    payload: {},
  });
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const user = await client.user.findUnique({
      where: { id: userId },
    });

    res.status(200).json({
      message: "Profile fetched successfully",
      payload: {
        user: user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
  }
};
