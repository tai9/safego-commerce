
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCog,
  Settings,
  BarChart3,
  Menu,
  X,
  Bell,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  Keyboard,
  AlertCircle,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SearchPopover } from "./SearchPopover";
import { EnhancedAvatar } from "./EnhancedAvatar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const navigationItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Products",
      icon: Package,
      path: "/dashboard/products",
      badge: {
        count: 140,
        variant: "outline" as const,
      }
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      path: "/dashboard/orders",
      badge: {
        count: 3,
        variant: "default" as const,
      }
    },
    {
      title: "Customers",
      icon: Users,
      path: "/dashboard/customers",
    },
    {
      title: "Users",
      icon: UserCog,
      path: "/dashboard/users",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/dashboard/reports",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "Order #12345 has been placed",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Product 'Wireless Headphones' is low on stock",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "Payment for Order #12344 was successful",
      time: "4 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "New Review",
      message: "A customer left a 5-star review",
      time: "Yesterday",
      read: true,
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully.",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center">
              <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center text-primary-foreground font-bold mr-3">
                EA
              </div>
              <h1 className="text-xl font-bold">E-Shop Admin</h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                    className="group relative flex w-full cursor-pointer items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <item.icon className={cn(
                      "h-5 w-5 mr-3 shrink-0",
                      isActive(item.path) ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      isActive(item.path) ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <Badge variant={item.badge.variant} className="ml-auto">
                        {item.badge.count}
                      </Badge>
                    )}
                    
                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-4">
              <EnhancedAvatar 
                fallback="Admin User"
                src="/placeholder.svg"
                size="md"
                withBorder={true}
                status="online"
              />
              <div className="ml-2">
                <span className="text-sm font-medium">Admin User</span>
                <p className="text-xs text-muted-foreground">admin@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile drawer */}
        <Drawer>
          <div className="md:hidden fixed top-0 left-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between p-4">
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <h1 className="text-xl font-bold">E-Shop Admin</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <EnhancedAvatar
                      fallback="AD" 
                      src="/placeholder.svg"
                      size="sm"
                      withBorder={true}
                      status="online"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <DrawerContent className="h-[85%] max-w-none">
            <div className="mx-auto w-full max-w-md">
              <div className="p-4 bg-background">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center text-primary-foreground font-bold">
                    EA
                  </div>
                  <h2 className="text-lg font-semibold">E-Shop Admin</h2>
                </div>
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                      {item.badge && (
                        <Badge variant={item.badge.variant} className="ml-auto">
                          {item.badge.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        <main className="flex-1 overflow-auto">
          <header className="hidden md:flex sticky top-0 z-10 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <SearchPopover />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotificationsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                        {unreadNotificationsCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Notifications</h4>
                      <Button variant="ghost" size="sm">Mark all as read</Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b last:border-b-0 hover:bg-muted/50 ${notification.read ? '' : 'bg-muted/30'}`}
                      >
                        <div className="flex justify-between gap-2">
                          <h5 className="font-medium">{notification.title}</h5>
                          {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <span className="text-xs text-muted-foreground mt-2">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <EnhancedAvatar
                      fallback="Admin User" 
                      src="/placeholder.svg"
                      size="md"
                      withBorder={true}
                      status="online"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@gmail.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Keyboard className="mr-2 h-4 w-4" />
                      <span>Keyboard shortcuts</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <div className="p-4 md:p-6 pt-16 md:pt-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Helper function for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default DashboardLayout;
