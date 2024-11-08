import z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const logoutSchema = z.object({
  token: z.string(),
});

export const profileSchema = z.object({
  token: z.string(),
});
