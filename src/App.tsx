
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import OnSale from "./pages/OnSale";
import NewArrivals from "./pages/NewArrivals";
import Brands from "./pages/Brands";
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import ProductsManagement from "./pages/dashboard/ProductsManagement";
import OrdersManagement from "./pages/dashboard/OrdersManagement";
import CustomersManagement from "./pages/dashboard/CustomersManagement";
import UsersManagement from "./pages/dashboard/UsersManagement";
import SettingsManagement from "./pages/dashboard/SettingsManagement";
import ReportsManagement from "./pages/dashboard/ReportsManagement";

const App = () => (
  <HelmetProvider>
    {/* Single TooltipProvider for the entire app with no delayDuration */}
    <TooltipProvider delayDuration={0}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sale" element={<OnSale />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/brands" element={<Brands />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="customers" element={<CustomersManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="settings" element={<SettingsManagement />} />
            <Route path="reports" element={<ReportsManagement />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
