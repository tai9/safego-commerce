
import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/products";

type SearchResultType = "product" | "order" | "customer" | "user" | "setting" | "report";

export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  path: string;
  type: SearchResultType;
};

export function useDashboardSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const debounceTimer = useRef<number | null>(null);
  
  // Search data sources
  const productResults: SearchResult[] = products.map(product => ({
    id: product.id,
    title: product.name,
    description: `${product.category} - ${product.brand} - $${product.price}`,
    path: `/dashboard/products?search=${encodeURIComponent(product.name)}`,
    type: "product"
  }));
  
  // Mock data for other sections
  const mockResults: SearchResult[] = [
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
  ];

  // Combine all searchable data
  const allSearchableData = [...productResults, ...mockResults];

  const performSearch = useCallback((searchQuery: string) => {
    setIsSearching(true);
    
    // Clear previous timer if it exists
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set a new timer
    debounceTimer.current = window.setTimeout(() => {
      if (searchQuery.trim() === "") {
        setResults([]);
        setIsSearching(false);
        return;
      }
      
      const query = searchQuery.toLowerCase();
      const filtered = allSearchableData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      );
      
      // Sort results with exact matches first then by type priority
      const typePriority: { [key in SearchResultType]: number } = {
        product: 1,
        order: 2,
        customer: 3,
        user: 4,
        setting: 5,
        report: 6
      };
      
      const sorted = filtered.sort((a, b) => {
        // Exact match takes precedence
        const aExactMatch = a.title.toLowerCase() === query;
        const bExactMatch = b.title.toLowerCase() === query;
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        // Starts with match takes second precedence
        const aStartsWith = a.title.toLowerCase().startsWith(query);
        const bStartsWith = b.title.toLowerCase().startsWith(query);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        // Finally sort by type priority
        return typePriority[a.type] - typePriority[b.type];
      });
      
      setResults(sorted.slice(0, 10)); // Limit to 10 results
      setIsSearching(false);
    }, 200); // 200ms debounce
  }, [allSearchableData]);
  
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      toast({
        title: "Searching",
        description: `Searching for "${query}"...`,
      });
      
      if (results.length > 0) {
        navigateToResult(results[0]); // Navigate to first result
      }
    }
  }, [query, results, toast]);
  
  const navigateToResult = useCallback((result: SearchResult) => {
    navigate(result.path);
    
    toast({
      title: "Navigated",
      description: `Navigated to ${result.title}`,
    });
  }, [navigate, toast]);
  
  useEffect(() => {
    performSearch(query);
    
    // Cleanup function to clear any pending timers
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, performSearch]);
  
  return {
    query,
    setQuery,
    results,
    isSearching,
    handleSearch,
    navigateToResult
  };
}
