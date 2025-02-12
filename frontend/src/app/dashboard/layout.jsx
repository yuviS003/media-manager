"use client"
import DashboardAppbarAndSidebar from "@/components/dashboard-comps/appbar-sidebar";
import { Box, Toolbar } from "@mui/material";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardAppbarAndSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
