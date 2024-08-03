import { z } from "zod";

export const requiredString = z.string().min(1, "required");
export const signUpSchema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username must contain only letters, numbers, underscores, or hyphens",
  ),
  email: requiredString.email("Invaild email address"),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});
