import AuthForm from "@/components/Authform";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const Page = () => {
  return <AuthForm type="signin" />;
};

export default Page;
