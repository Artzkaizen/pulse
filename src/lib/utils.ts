import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const requiredString = z.string().min(1, "required");

export const authFormSchema = (type: "signin" | "signup") =>
  z.object({
    username: requiredString.regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username must contain only letters, numbers, underscores, or hyphens",
    ),
    email:
      type === "signup"
        ? requiredString.email({
            message: "Must be a valiid email eg. demo@demo.com",
          })
        : z.string().optional(),
    password: requiredString.min(
      8,
      "Password must be at least 8 characters long",
    ),
  });
