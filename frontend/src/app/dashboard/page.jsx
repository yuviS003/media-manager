import { redirect } from "next/navigation";

const DashboardPage = () => {
  if (!sessionStorage.getItem("token") && !localStorage.getItem("token"))
    return redirect("/");
  return redirect("/dashboard/media");
};

export default DashboardPage;
