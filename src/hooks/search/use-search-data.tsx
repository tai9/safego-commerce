
import { useMemo } from "react";
import { products } from "@/data/products";
import { SearchResult } from "./types";

export function useSearchData() {
  // Memoize the product search results to avoid recreating on each render
  const productResults = useMemo<SearchResult[]>(() => products.map(product => ({
    id: product.id,
    title: product.name,
    description: `${product.category} - ${product.brand} - $${product.price}`,
    path: `/dashboard/products?search=${encodeURIComponent(product.name)}`,
    type: "product"
  })), []);
  
  // Mock data for other sections - memoized to avoid recreation
  const mockResults = useMemo<SearchResult[]>(() => [
    {
      id: "order_1",
      title: "Order #12345",
      description: "Placed on Apr 1, 2025 - $245.00",
      path: "/dashboard/orders",
      type: "order"
    },
    {
      id: "order_2",
      title: "Order #12346",
      description: "Placed on Apr 2, 2025 - $189.50",
      path: "/dashboard/orders",
      type: "order"
    },
    {
      id: "customer_1",
      title: "John Doe",
      description: "john.doe@example.com - 3 orders",
      path: "/dashboard/customers",
      type: "customer"
    },
    {
      id: "customer_2",
      title: "Jane Smith",
      description: "jane.smith@example.com - 7 orders",
      path: "/dashboard/customers",
      type: "customer"
    },
    {
      id: "settings_1",
      title: "Payment Settings",
      description: "Configure payment providers",
      path: "/dashboard/settings",
      type: "setting"
    },
    {
      id: "settings_2",
      title: "Notification Settings",
      description: "Configure email notifications",
      path: "/dashboard/settings",
      type: "setting"
    },
    {
      id: "report_1",
      title: "Monthly Sales Report",
      description: "Sales performance for March 2025",
      path: "/dashboard/reports",
      type: "report"
    },
    {
      id: "report_2",
      title: "Customer Acquisition Report",
      description: "New customers for Q1 2025",
      path: "/dashboard/reports",
      type: "report"
    },
    {
      id: "user_1",
      title: "Admin User",
      description: "admin@example.com - Super Admin",
      path: "/dashboard/users",
      type: "user"
    },
    {
      id: "user_2",
      title: "Editor User",
      description: "editor@example.com - Content Editor",
      path: "/dashboard/users",
      type: "user"
    }
  ], []);

  // Combine all searchable data
  const allSearchableData = useMemo(() => 
    [...productResults, ...mockResults], 
    [productResults, mockResults]
  );

  return { allSearchableData };
}
