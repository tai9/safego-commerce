
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, UserRound, Heart, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Profile = () => {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>My Profile | SHOP.CO</title>
        <meta name="description" content="Manage your SHOP.CO account, view orders, and update your profile information." />
        <meta name="robots" content="noindex" /> {/* Don't index user-specific pages */}
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-6 pt-4">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "profile" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <UserRound size={20} />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "orders" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <ShoppingBag size={20} />
                    <span>Orders</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("wishlist")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "wishlist" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "settings" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Tabs */}
          <div className="md:hidden w-full mb-6">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
                <UserRound size={18} className="mb-1" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>
                <ShoppingBag size={18} className="mb-1" />
                <span className="text-xs">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" onClick={() => setActiveTab("wishlist")}>
                <Heart size={18} className="mb-1" />
                <span className="text-xs">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
                <Settings size={18} className="mb-1" />
                <span className="text-xs">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Content Area */}
          <div className="col-span-3">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and edit your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative">
                      <img 
                        src={user.imageUrl} 
                        alt={user.fullName || "Profile"} 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{user.fullName}</h3>
                      <p className="text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={user.firstName || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={user.lastName || ""} readOnly />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.primaryEmailAddress?.emailAddress || ""} readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View and track your recent orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                    <Button asChild>
                      <a href="/products">Start Shopping</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>
                    Products you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No Items in Wishlist</h3>
                    <p className="text-gray-500 mb-4">Save items you love to your wishlist</p>
                    <Button asChild>
                      <a href="/products">Browse Products</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Email Preferences</h4>
                      <div className="flex items-center">
                        <input type="checkbox" id="marketing" className="mr-2" />
                        <Label htmlFor="marketing">Receive marketing emails</Label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Password</h4>
                      <Button>Change Password</Button>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Account Actions</h4>
                      <Button variant="destructive" className="flex items-center">
                        <LogOut size={16} className="mr-2" /> Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
