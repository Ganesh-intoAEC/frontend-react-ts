import React from "react";
import SignInCard from "@/app/pages/signIn/signInForm";
import { SessionProvider } from "next-auth/react";

function Signin() {
  return <SignInCard />;
}

export default Signin;
