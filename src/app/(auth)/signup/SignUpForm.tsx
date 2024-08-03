"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "./actions";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/CustomFormField";
import { z } from "zod";

export type SignUpValues = z.infer<typeof signUpSchema>;
export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  const togglePassword = () => {
    setisPasswordVisible(!isPasswordVisible);
  };
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) setError(error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}

        <CustomFormField
          label="Username"
          control={form.control}
          name="username"
          placeholder="Enter your Username"
        />
        <CustomFormField
          label="Email"
          control={form.control}
          name="email"
          placeholder="Enter your email"
        />
        <div className="relative">
          <CustomFormField
            label="Password"
            control={form.control}
            name="password"
            isPasswordVisible={isPasswordVisible}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="toggle-btn absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none"
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            disabled={isPending}
            type="submit"
            className="form-btn h-14 border-primary"
          >
            {isPending ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp;
                Loading....
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
