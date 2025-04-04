
import { useState, useEffect, useCallback } from "react";
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
  
  // Search data sources
  const productResults: SearchResult[] = products.map(product => ({
    id: product.id,
    title: product.name,
    description: `${product.category} - ${product.brand}`,
    path: `/dashboard/products?search=${encodeURIComponent(product.name)}`,
    type: "product"
  }));
  
  // Mock data for other sections
  const mockResults: SearchResult[] = [
    {
      id: "order_1",
      title: "Order #12345",
      description: "Placed on Apr 1, 2025",
      path: "/dashboard/orders",
      type: "order"
    },
    {
      id: "customer_1",
      title: "John Doe",
      description: "john.doe@example.com",
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
      id: "report_1",
      title: "Monthly Sales Report",
      description: "Sales performance for March 2025",
      path: "/dashboard/reports",
      type: "report"
    },
    {
      id: "user_1",
      title: "Admin User",
      description: "admin@example.com",
      path: "/dashboard/users",
      type: "user"
    }
  ];

  // Combine all searchable data
  const allSearchableData = [...productResults, ...mockResults];

  const performSearch = useCallback((searchQuery: string) => {
    setIsSearching(true);
    
    // Search logic
    setTimeout(() => {
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
      
      // Sort results with exact matches first
      const sorted = filtered.sort((a, b) => {
        const aExactMatch = a.title.toLowerCase() === query;
        const bExactMatch = b.title.toLowerCase() === query;
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        return 0;
      });
      
      setResults(sorted.slice(0, 10)); // Limit to 10 results
      setIsSearching(false);
    }, 200);
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
    setQuery("");
    setResults([]);
    
    toast({
      title: "Navigated",
      description: `Navigated to ${result.title}`,
    });
  }, [navigate, toast]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(query);
    }, 300);
    
    return () => clearTimeout(handler);
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
