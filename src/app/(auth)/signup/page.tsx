import AuthForm from "../Authform";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign up",
};

const page = () => {
  return <AuthForm type="signup" />;
};

export default page;
