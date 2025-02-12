"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("token") && !localStorage.getItem("token"))
      redirect("/");
    else redirect("/dashboard/media");
  }, []);
  return null;
};

export default DashboardPage;
