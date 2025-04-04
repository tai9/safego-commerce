
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type SearchResult = {
  id: string;
  title: string;
  description?: string;
  path: string;
  type: "product" | "order" | "customer" | "user" | "setting" | "report";
  icon?: React.ReactNode;
};

export function useDashboardSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock search data - in a real app this would come from an API
  const mockSearchData: SearchResult[] = [
    {
      id: "product_1",
      title: "Wireless Headphones",
      description: "Noise cancelling headphones with Bluetooth",
      path: "/dashboard/products",
      type: "product"
    },
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
      id: "product_2",
      title: "Smartphone XS",
      description: "Latest smartphone with 5G",
      path: "/dashboard/products",
      type: "product"
    },
    {
      id: "report_1",
      title: "Monthly Sales Report",
      description: "Sales performance for March 2025",
      path: "/dashboard/reports",
      type: "report"
    }
  ];

  const performSearch = useCallback((searchQuery: string) => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setResults([]);
        setIsSearching(false);
        return;
      }
      
      const filtered = mockSearchData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setResults(filtered);
      setIsSearching(false);
    }, 300); // Simulated API delay
  }, []);
  
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      toast({
        title: "Searching",
        description: `Searching for "${query}"...`,
      });
      
      // In a real app, this would navigate to a search results page
      // navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, toast]);
  
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
