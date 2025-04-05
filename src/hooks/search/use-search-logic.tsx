
import { useState, useCallback, useRef } from "react";
import { SearchResult, SearchResultType } from "./types";

export function useSearchLogic(allSearchableData: SearchResult[]) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<number | null>(null);

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
  
  // Reset search timer on unmount
  const cleanupSearch = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    performSearch,
    cleanupSearch
  };
}
