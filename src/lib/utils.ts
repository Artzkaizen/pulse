import { type ClassValue, clsx } from "clsx";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const requiredString = z.string().min(1, "required");

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

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
    firstname: type === "signup" ? requiredString : z.string().optional(),
    gender: type === "signup" ? requiredString : z.string().optional(),
    lastname: type === "signup" ? requiredString : z.string().optional(),
    password: requiredString.min(
      8,
      "Password must be at least 8 characters long",
    ),
  });

export const createPostSchema = z.object({
  content: requiredString,
});

export const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatRelativeDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  if (diff < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  } else {
    if (date.getFullYear() === now.getFullYear()) {
      return formatDate(date, "MMM d");
    } else {
      return formatDate(date, "MMM d, yyyy");
    }
  }
};

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}
