import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, Eye, MoreHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogTrigger,
} from "@/components/ui/dialog";
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

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2025-04-02T10:30:00",
    status: "Delivered",
    total: 245.00,
    items: 3,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2025-04-02T09:15:00",
    status: "Processing",
    total: 189.50,
    items: 2,
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    email: "robert@example.com",
    date: "2025-04-01T16:20:00",
    status: "Shipped",
    total: 322.75,
    items: 4,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    date: "2025-04-01T14:45:00",
    status: "Pending",
    total: 95.20,
    items: 1,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    email: "michael@example.com",
    date: "2025-03-31T11:10:00",
    status: "Delivered",
    total: 157.30,
    items: 2,
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-006",
    customer: "Sarah Brown",
    email: "sarah@example.com",
    date: "2025-03-31T09:30:00",
    status: "Cancelled",
    total: 210.45,
    items: 3,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-007",
    customer: "David Lee",
    email: "david@example.com",
    date: "2025-03-30T16:15:00",
    status: "Refunded",
    total: 169.99,
    items: 1,
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-008",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    date: "2025-03-30T13:40:00",
    status: "Delivered",
    total: 275.50,
    items: 3,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-009",
    customer: "Steven Taylor",
    email: "steven@example.com",
    date: "2025-03-29T15:20:00",
    status: "Shipped",
    total: 132.80,
    items: 2,
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-010",
    customer: "Jennifer White",
    email: "jennifer@example.com",
    date: "2025-03-29T10:05:00",
    status: "Processing",
    total: 198.35,
    items: 4,
    paymentMethod: "PayPal"
  },
];

const orderDetails = {
  id: "ORD-001",
  customer: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  date: "2025-04-02T10:30:00",
  status: "Delivered",
  total: 245.00,
  subtotal: 220.00,
  tax: 20.00,
  shipping: 5.00,
  discount: 0,
  paymentMethod: "Credit Card",
  shippingAddress: {
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States"
  },
  items: [
    {
      id: "1",
      name: "Gradient Graphic T-shirt",
      price: 145.00,
      quantity: 1,
      total: 145.00,
      image: "/lovable-uploads/cd011f2c-675c-4750-8cc2-421974b43274.png"
    },
    {
      id: "6",
      name: "Sleeve Striped T-shirt",
      price: 65.00,
      quantity: 1,
      total: 65.00,
      image: "/lovable-uploads/4cbbba7d-483f-4592-8429-560b25ec214f.png"
    },
    {
      id: "9",
      name: "Loose Fit Bermuda Shorts",
      price: 10.00,
      quantity: 1,
      total: 10.00,
      image: "/lovable-uploads/1aeccf89-6964-414c-842b-74ca991739fc.png"
    }
  ]
};

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
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "Refunded":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const formatDate = (dateString: string) => {
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

const OrdersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && order.status.toLowerCase() === selectedTab.toLowerCase();
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOrderDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Orders Management | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage customer orders, track status, and process fulfillment.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
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
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>{formatPrice(order.total)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleOrderClick(order.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Print Invoice
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
                    {currentPage === 1 ? (
                      <Button variant="ghost" size="icon" disabled>
                        <span className="sr-only">Previous page</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    ) : (
                      <PaginationPrevious href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(Math.max(1, currentPage - 1));
                      }} />
                    )}
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
                          href="#"
                          isActive={pageNum === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
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
                    {currentPage === totalPages ? (
                      <Button variant="ghost" size="icon" disabled>
                        <span className="sr-only">Next page</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M6.15803 3.13514C6.35949 2.94628 6.67591 2.95648 6.86477 3.15794L10.6148 7.15794C10.7951 7.35027 10.7951 7.64955 10.6148 7.84188L6.86477 11.8419C6.67591 12.0433 6.35949 12.0535 6.15803 11.8647C5.95657 11.6758 5.94637 11.3594 6.13523 11.1579L9.56464 7.49991L6.13523 3.84188C5.94637 3.64042 5.95657 3.32401 6.15803 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    ) : (
                      <PaginationNext href="#" onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(Math.min(totalPages, currentPage + 1));
                      }} />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {currentItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium">No orders found</p>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {orderDetails.id}</DialogTitle>
              <DialogDescription>
                Placed on {formatDate(orderDetails.date)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Customer Information</h3>
                  <div className="mt-1 text-sm">
                    <p className="font-medium">{orderDetails.customer}</p>
                    <p>{orderDetails.email}</p>
                    <p>{orderDetails.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Shipping Address</h3>
                  <div className="mt-1 text-sm">
                    <p>{orderDetails.shippingAddress.line1}</p>
                    {orderDetails.shippingAddress.line2 && <p>{orderDetails.shippingAddress.line2}</p>}
                    <p>
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}
                    </p>
                    <p>{orderDetails.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Order Status</h3>
                <div className="mt-1">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      orderDetails.status
                    )}`}
                  >
                    {orderDetails.status}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Order Items</h3>
                <div className="mt-1 border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Item</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderDetails.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{formatPrice(item.price)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatPrice(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Order Summary</h3>
                <div className="mt-1 text-sm">
                  <div className="flex justify-between py-1">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderDetails.subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Shipping</span>
                    <span>{formatPrice(orderDetails.shipping)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Tax</span>
                    <span>{formatPrice(orderDetails.tax)}</span>
                  </div>
                  {orderDetails.discount > 0 && (
                    <div className="flex justify-between py-1">
                      <span>Discount</span>
                      <span>-{formatPrice(orderDetails.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 font-bold">
                    <span>Total</span>
                    <span>{formatPrice(orderDetails.total)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Payment Information</h3>
                <div className="mt-1 text-sm">
                  <p><span className="font-medium">Method:</span> {orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline">Print Invoice</Button>
              <Button>Update Status</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default OrdersManagement;
