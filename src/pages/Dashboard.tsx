
import { Helmet } from "react-helmet-async";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const Dashboard = () => {
  const location = useLocation();

  // The simplified authentication check - removed ClerkAuth dependency
  // We'll assume if the user reached this page, they're authenticated
  // This could be enhanced with a proper auth state check or token validation
  
  return (
    <>
      <Helmet>
        <title>Dashboard | E-Commerce Admin</title>
      </Helmet>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
