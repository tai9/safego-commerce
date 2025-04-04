
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

// Sample data for charts
const revenueData = [
  { name: "Jan", total: 1800 },
  { name: "Feb", total: 2200 },
  { name: "Mar", total: 2600 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 2900 },
  { name: "Jun", total: 3500 },
  { name: "Jul", total: 4200 },
];

const visitorsData = [
  { name: "Mon", value: 540 },
  { name: "Tue", value: 620 },
  { name: "Wed", value: 700 },
  { name: "Thu", value: 680 },
  { name: "Fri", value: 750 },
  { name: "Sat", value: 890 },
  { name: "Sun", value: 820 },
];

// Sample order data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    status: "Delivered",
    date: "April 2, 2025",
    total: "$245.00",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    status: "Processing",
    date: "April 2, 2025",
    total: "$189.50",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    status: "Shipped",
    date: "April 1, 2025",
    total: "$322.75",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    status: "Pending",
    date: "April 1, 2025",
    total: "$95.20",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    status: "Delivered",
    date: "March 31, 2025",
    total: "$157.30",
  },
];

// Get status badge color based on status
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

const DashboardOverview = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Overview | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your store's performance and recent activities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+20.1%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+12.2%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+8.4%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500">-3.2%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <div>
                    <p className="text-sm font-medium">New order #ORD-001 received</p>
                    <p className="text-sm text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium">Order #ORD-002 has been shipped</p>
                    <p className="text-sm text-muted-foreground">32 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Low stock alert for Product X</p>
                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                  <div>
                    <p className="text-sm font-medium">Payment failed for order #ORD-005</p>
                    <p className="text-sm text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                  <div>
                    <p className="text-sm font-medium">New customer registered</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">{order.total}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end mt-4 space-x-2">
                <Button variant="outline" size="sm">View All Orders</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
