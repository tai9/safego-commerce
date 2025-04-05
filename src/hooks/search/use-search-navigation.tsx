
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SearchResult } from "./types";

export function useSearchNavigation() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigateToResult = useCallback((result: SearchResult) => {
    navigate(result.path);
    
    toast({
      title: "Navigated",
      description: `Navigated to ${result.title}`,
    });
  }, [navigate, toast]);

  const handleSearch = useCallback((
    e: React.FormEvent,
    query: string,
    results: SearchResult[]
  ) => {
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
  }, [toast, navigateToResult]);

  return {
    navigateToResult,
    handleSearch
  };
}
