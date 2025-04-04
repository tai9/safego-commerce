
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const Dashboard = () => {
  const location = useLocation();
  
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
