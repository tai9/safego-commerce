
import { useEffect } from "react";
import { useSearchData } from "./use-search-data";
import { useSearchLogic } from "./use-search-logic";
import { useSearchNavigation } from "./use-search-navigation";
import { SearchResult } from "./types";

export function useDashboardSearch() {
  const { allSearchableData } = useSearchData();
  const {
    query,
    setQuery,
    results,
    isSearching,
    performSearch,
    cleanupSearch
  } = useSearchLogic(allSearchableData);
  const { navigateToResult, handleSearch } = useSearchNavigation();

  // Perform search when query changes
  useEffect(() => {
    performSearch(query);
    
    // Cleanup function to clear any pending timers
    return cleanupSearch;
  }, [query, performSearch, cleanupSearch]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    handleSearch(e, query, results);
  };

  return {
    query,
    setQuery,
    results,
    isSearching,
    handleSearch: handleSearchSubmit,
    navigateToResult
  };
}

// Re-export the types
export type { SearchResult } from "./types";
export type { SearchResultType } from "./types";
