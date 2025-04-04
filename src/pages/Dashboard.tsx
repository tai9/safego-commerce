
import { Helmet } from "react-helmet-async";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const Dashboard = () => {
  const { userId, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!userId) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

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
