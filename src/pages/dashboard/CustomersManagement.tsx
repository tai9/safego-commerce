
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, MoreHorizontal, Eye, Mail, ShoppingCart } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample customer data
const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: 1245.50,
    lastOrder: "2025-04-01T10:30:00",
    dateJoined: "2023-08-15T14:22:00",
    status: "Active"
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    orders: 8,
    totalSpent: 945.25,
    lastOrder: "2025-03-28T16:45:00",
    dateJoined: "2023-09-22T11:10:00",
    status: "Active"
  },
  {
    id: "CUST003",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 345-6789",
    orders: 5,
    totalSpent: 572.80,
    lastOrder: "2025-03-25T09:15:00",
    dateJoined: "2024-01-05T09:30:00",
    status: "Active"
  },
  {
    id: "CUST004",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    totalSpent: 355.20,
    lastOrder: "2025-04-02T14:20:00",
    dateJoined: "2024-02-18T10:45:00",
    status: "Active"
  },
  {
    id: "CUST005",
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "+1 (555) 567-8901",
    orders: 7,
    totalSpent: 890.60,
    lastOrder: "2025-03-30T11:10:00",
    dateJoined: "2023-11-02T13:15:00",
    status: "Active"
  },
  {
    id: "CUST006",
    name: "Sarah Brown",
    email: "sarah@example.com",
    phone: "+1 (555) 678-9012",
    orders: 0,
    totalSpent: 0,
    lastOrder: null,
    dateJoined: "2025-03-28T15:30:00",
    status: "Inactive"
  },
  {
    id: "CUST007",
    name: "David Lee",
    email: "david@example.com",
    phone: "+1 (555) 789-0123",
    orders: 2,
    totalSpent: 299.99,
    lastOrder: "2025-03-15T16:15:00",
    dateJoined: "2024-02-10T09:20:00",
    status: "Active"
  },
  {
    id: "CUST008",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1 (555) 890-1234",
    orders: 4,
    totalSpent: 475.75,
    lastOrder: "2025-03-22T13:40:00",
    dateJoined: "2023-12-05T14:10:00",
    status: "Active"
  },
  {
    id: "CUST009",
    name: "Steven Taylor",
    email: "steven@example.com",
    phone: "+1 (555) 901-2345",
    orders: 1,
    totalSpent: 132.80,
    lastOrder: "2025-02-28T15:20:00",
    dateJoined: "2025-01-20T10:35:00",
    status: "Inactive"
  },
  {
    id: "CUST010",
    name: "Jennifer White",
    email: "jennifer@example.com",
    phone: "+1 (555) 012-3456",
    orders: 6,
    totalSpent: 725.35,
    lastOrder: "2025-03-25T10:05:00",
    dateJoined: "2023-10-10T13:50:00",
    status: "Active"
  },
];

// Sample customer details and orders
const customerDetails = {
  id: "CUST001",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  dateJoined: "2023-08-15T14:22:00",
  status: "Active",
  orders: 12,
  totalSpent: 1245.50,
  addresses: [
    {
      id: "ADDR001",
      type: "Billing",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      default: true
    },
    {
      id: "ADDR002",
      type: "Shipping",
      line1: "456 Park Ave",
      line2: "",
      city: "New York",
      state: "NY",
      postalCode: "10002",
      country: "United States",
      default: true
    }
  ],
  recentOrders: [
    {
      id: "ORD-001",
      date: "2025-04-01T10:30:00",
      status: "Delivered",
      total: 245.00,
      items: 3
    },
    {
      id: "ORD-007",
      date: "2025-03-15T14:22:00",
      status: "Delivered",
      total: 178.50,
      items: 2
    },
    {
      id: "ORD-015",
      date: "2025-02-28T09:15:00",
      status: "Delivered",
      total: 120.75,
      items: 1
    },
    {
      id: "ORD-023",
      date: "2025-02-10T16:40:00",
      status: "Delivered",
      total: 290.25,
      items: 4
    }
  ]
};

// Helper functions
const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Get initials from name for avatar
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Get order status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Shipped":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const CustomersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const itemsPerPage = 10;

  // Filter customers based on search query and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && customer.status.toLowerCase() === selectedTab.toLowerCase();
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsCustomerDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Customers Management | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage customer accounts, view purchase history, and analyze customer behavior.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">
                +24.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((customers.filter(c => c.status === "Active").length / customers.length) * 100)}% of total customers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Avg. Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.filter(c => c.orders > 0).length)}
              </div>
              <p className="text-xs text-muted-foreground">
                Per customer with orders
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>
                        {customer.totalSpent > 0 ? formatPrice(customer.totalSpent) : "—"}
                      </TableCell>
                      <TableCell>
                        {customer.lastOrder ? formatDate(customer.lastOrder).split(',')[0] : "—"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleCustomerClick(customer.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Email Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              View Orders
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      if (currentPage > totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      }
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {currentItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium">No customers found</p>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Customer Details Dialog */}
        <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                View detailed information about this customer.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">{getInitials(customerDetails.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{customerDetails.name}</h2>
                  <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                    <p>ID: {customerDetails.id}</p>
                    <p>Joined {formatDate(customerDetails.dateJoined).split(',')[0]}</p>
                    <p className="flex items-center">
                      <span
                        className={`mr-1 inline-block h-2 w-2 rounded-full ${
                          customerDetails.status === "Active" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      {customerDetails.status}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-medium">Contact Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>Email: {customerDetails.email}</p>
                    <p>Phone: {customerDetails.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Statistics</h3>
                  <div className="space-y-1 text-sm">
                    <p>Total Orders: {customerDetails.orders}</p>
                    <p>Total Spent: {formatPrice(customerDetails.totalSpent)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 font-medium">Addresses</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {customerDetails.addresses.map(address => (
                    <div key={address.id} className="rounded-md border p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{address.type}</h4>
                        {address.default && (
                          <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>{address.line1}</p>
                        {address.line2 && <p>{address.line2}</p>}
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 font-medium">Recent Orders</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerDetails.recentOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{formatDate(order.date).split(',')[0]}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline">Email Customer</Button>
              <Button>Edit Details</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CustomersManagement;
