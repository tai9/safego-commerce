
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useUser } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, UserRound, Heart, Settings, LogOut, MapPin, Calendar, Bookmark, CreditCard } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const orderHistory = [
    {
      id: "ORD-123456",
      date: "2023-12-15",
      status: "Delivered",
      total: 145.00,
      items: 2
    },
    {
      id: "ORD-123457",
      date: "2023-11-28",
      status: "Processing",
      total: 85.50,
      items: 1
    }
  ];

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "(555) 123-4567",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Corporate Plaza, Suite 100",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "(555) 987-6543",
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      expiry: "12/24",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "5555",
      expiry: "08/25",
      isDefault: false
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>My Profile | Safego</title>
        <meta name="description" content="Manage your Safego account, view orders, and update your profile information." />
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
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "profile" ? "bg-secondary font-medium" : "hover:bg-secondary/50"}`}
                  >
                    <UserRound size={20} />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "orders" ? "bg-secondary font-medium" : "hover:bg-secondary/50"}`}
                  >
                    <ShoppingBag size={20} />
                    <span>Orders</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("addresses")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "addresses" ? "bg-secondary font-medium" : "hover:bg-secondary/50"}`}
                  >
                    <MapPin size={20} />
                    <span>Addresses</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("payment")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "payment" ? "bg-secondary font-medium" : "hover:bg-secondary/50"}`}
                  >
                    <CreditCard size={20} />
                    <span>Payment Methods</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("wishlist")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "wishlist" ? "bg-secondary font-medium" : "hover:bg-secondary/50"}`}
                  >
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center text-left space-x-2 px-2 py-2 rounded-md ${activeTab === "settings" ? "bg-secondary font-medium" : "hover:bg-secondary/50"}`}
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
            <TabsList className="w-full grid grid-cols-3 mb-2">
              <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
                <UserRound size={18} className="mb-1" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>
                <ShoppingBag size={18} className="mb-1" />
                <span className="text-xs">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" onClick={() => setActiveTab("addresses")}>
                <MapPin size={18} className="mb-1" />
                <span className="text-xs">Addresses</span>
              </TabsTrigger>
            </TabsList>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="payment" onClick={() => setActiveTab("payment")}>
                <CreditCard size={18} className="mb-1" />
                <span className="text-xs">Payment</span>
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
                      <p className="text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                      {user.createdAt && (
                        <p className="text-sm flex items-center mt-1 text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          Member since {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      )}
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

                    <div className="md:col-span-2">
                      <Button variant="outline" className="mt-4">
                        Edit Profile
                      </Button>
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
                  {orderHistory.length > 0 ? (
                    <div className="space-y-6">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="bg-secondary/30 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div>
                              <h3 className="font-medium text-lg">{order.id}</h3>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Calendar size={14} className="mr-1" />
                                {order.date}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' 
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-t border-border">
                            <div>
                              <p className="text-sm">
                                <span className="text-muted-foreground">Items:</span> {order.items}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <p className="font-semibold">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between mt-4 pt-2 border-t border-border">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              Track Order
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                      <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                      <Button asChild>
                        <a href="/products">Start Shopping</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {activeTab === "addresses" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Addresses</CardTitle>
                  <CardDescription>
                    Manage your shipping and billing addresses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {addresses.length > 0 ? (
                    <div className="space-y-6">
                      {addresses.map((address) => (
                        <div key={address.id} className="border border-border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <h3 className="font-medium">{address.type}</h3>
                              {address.isDefault && (
                                <span className="ml-2 bg-secondary text-xs px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </div>
                          </div>
                          
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p>{address.name}</p>
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                            <p>{address.country}</p>
                            <p className="pt-1">{address.phone}</p>
                          </div>
                        </div>
                      ))}
                      
                      <Button className="w-full">
                        Add New Address
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No Addresses Saved</h3>
                      <p className="text-muted-foreground mb-4">You haven't added any addresses yet</p>
                      <Button>
                        Add New Address
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {activeTab === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paymentMethods.length > 0 ? (
                    <div className="space-y-6">
                      {paymentMethods.map((payment) => (
                        <div key={payment.id} className="border border-border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <h3 className="font-medium">{payment.type} •••• {payment.lastFour}</h3>
                              {payment.isDefault && (
                                <span className="ml-2 bg-secondary text-xs px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              {!payment.isDefault && (
                                <Button variant="ghost" size="sm">Set Default</Button>
                              )}
                              <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>
                        </div>
                      ))}
                      
                      <Button className="w-full">
                        Add New Payment Method
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <CreditCard size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
                      <p className="text-muted-foreground mb-4">You haven't added any payment methods yet</p>
                      <Button>
                        Add Payment Method
                      </Button>
                    </div>
                  )}
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
                    <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Items in Wishlist</h3>
                    <p className="text-muted-foreground mb-4">Save items you love to your wishlist</p>
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
                      <h4 className="font-medium mb-2">Communication Preferences</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing">Marketing emails</Label>
                          <Switch id="marketing" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-updates">Order updates</Label>
                          <Switch id="order-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="product-news">Product news</Label>
                          <Switch id="product-news" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Security</h4>
                      <div className="space-y-4">
                        <Button variant="outline">Change Password</Button>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="two-factor">Two-factor authentication</Label>
                          <Switch id="two-factor" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-4 text-destructive">Account Actions</h4>
                      <div className="space-y-4">
                        <Button variant="outline" className="flex items-center border-destructive text-destructive hover:bg-destructive/10">
                          <LogOut size={16} className="mr-2" /> Sign Out
                        </Button>
                        <Button variant="ghost" className="text-destructive hover:bg-destructive/10">
                          Delete Account
                        </Button>
                      </div>
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
