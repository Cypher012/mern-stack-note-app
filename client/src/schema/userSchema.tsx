import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(1, "Username Required"),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password cannot exceed 72 characters") // Optional: Enforce maximum length
    .trim(), // Remove leading/trailing whitespace
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format. Please enter a valid email address.")
    .trim(),
  password: z.string().trim().min(1, "Enter Password"),
});

export type signUpType = z.infer<typeof SignUpSchema>;
export type loginType = z.infer<typeof LoginSchema>;
