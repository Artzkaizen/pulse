"use client";
import { useState, useTransition } from "react";
import { z } from "zod";

import { login } from "@/app/(auth)/signin/actions";
import { signUp } from "@/app/(auth)/signup/actions";
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const requiredString = z.string().min(1, "Required");

const AuthForm = ({ type }: { type: "signin" | "signup" }) => {
  const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  const togglePassword = () => {
    setisPasswordVisible(!isPasswordVisible);
  };
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(undefined);
    startTransition(async () => {
      const { error } =
        type === "signup" ? await signUp(values) : await login(values);
      if (error) setError(error);
    });
    await new Promise((r) => setTimeout((r) => r, 1000));
  };

  return (
    <section className="w-full">
      <div className="my-4">
        <h1 className="lg:text-36 mb-12 h-1 text-3xl font-semibold leading-9">
          Hi, Welcome Back
        </h1>
        <p className="text-16 font-light leading-4">
          Please fill in your details to get access
        </p>
      </div>

      <Button asChild variant="secondary" className="group">
        <Link
          className="mt-1 h-14 w-full outline-primary hover:bg-primary"
          href="/"
        >
          <div className="flex gap-6 group-hover:text-white">
            <img
              src={"/assets/google-icon.svg"}
              width={20}
              height={20}
              alt="google"
            />
            <p>Sign in with Google</p>
          </div>
        </Link>
      </Button>

      <div className="my-8 flex items-center">
        <hr className="flex-grow border-t border-gray-300"></hr>
        <span className="mx-2 text-gray-400">Or Sign in Email</span>
        <hr className="flex-grow border-t border-gray-300"></hr>
      </div>
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => handleSubmit(values))}
            className="space-y-8"
          >
            {error && <p className="text-center text-destructive">{error}</p>}
            <CustomFormField
              label="Username"
              control={form.control}
              name="username"
              placeholder="Enter your Username"
            />
            {type === "signup" && (
              <>
                <div className="flex w-full flex-wrap justify-between">
                  <CustomFormField
                    label="Firstname"
                    control={form.control}
                    name="firstname"
                    placeholder="Enter your email"
                  />
                  <CustomFormField
                    label="Lastname"
                    control={form.control}
                    name="lastname"
                    placeholder="Enter your email"
                  />
                </div>
                {/* <div className="flex">
                  <CustomFormField
                    label="Email"
                    control={form.control}
                    name="email"
                    placeholder="Enter your email"
                  />
                  <SelectGenderField
                    className="w-full bg-secondary"
                    label="Gender"
                    options={[
                      {
                        value: "boy",
                        name: "Male",
                      },
                      {
                        value: "girl",
                        name: "Girl",
                      },
                    ]}
                    name="gender"
                    control={form.control}
                    placeholder="Select gender"
                  />
                </div> */}
              </>
            )}

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
                ) : type === "signin" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="my-4 flex justify-center gap-1 max-lg:justify-start">
          <p className="text-14 font-normal text-gray-600">
            {type === "signin"
              ? "Not Registered Yet ?"
              : "Already have an account ?"}
          </p>
          <Link
            href={type === "signin" ? "/signup" : "/signin"}
            className="form-link"
          >
            {type === "signin" ? "Create an Account" : "Log in here"}
          </Link>
        </div>
      </>
    </section>
  );
};

export default AuthForm;
