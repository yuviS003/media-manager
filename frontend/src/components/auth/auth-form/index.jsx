"use client";

import Logo from "@/components/logo";
import LoginForm from "../login-form";
import SignupForm from "../signup-form";
import { useEffect, useState } from "react";

const AuthForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const switchAuthForms = () => setShowLoginForm((show) => !show);

  useEffect(() => {
    const token =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");
    if (token) window.location.href = "/dashboard/media";
  }, []);
  return (
    <div className="border w-full h-full md:h-fit md:max-w-md p-10 md:rounded-xl bg-white flex flex-col items-center gap-1">
      <Logo />
      <span className="text-sm text-gray-500">
        {showLoginForm
          ? "Login with your credentials and start managing your files!"
          : "Register with your credentials and start managing your files!"}
      </span>
      {showLoginForm ? (
        <LoginForm switchAuthForms={switchAuthForms} />
      ) : (
        <SignupForm switchAuthForms={switchAuthForms} />
      )}
    </div>
  );
};

export default AuthForm;
