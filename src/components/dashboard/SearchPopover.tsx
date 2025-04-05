
import { useEffect, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "../ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "../ui/command";
import { useDashboardSearch, SearchResult } from "@/hooks/use-dashboard-search";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export function SearchPopover() {
  const {
    query,
    setQuery,
    results,
    isSearching,
    handleSearch,
    navigateToResult
  } = useDashboardSearch();

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 100);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "product":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Product</Badge>;
      case "order":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Order</Badge>;
      case "customer":
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Customer</Badge>;
      case "user":
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">User</Badge>;
      case "setting":
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Setting</Badge>;
      case "report":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Report</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    navigateToResult(result);
    setIsOpen(false);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleResultSelect(results[0]);
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative max-w-md w-full lg:max-w-sm" onClick={() => setIsOpen(true)}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search everything... (Ctrl+K)"
            className="h-10 w-full rounded-md border border-gray-200 bg-white pl-8 pr-4 text-sm dark:border-gray-800 dark:bg-gray-950"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0" 
        align="start" 
        sideOffset={5}
        onEscapeKeyDown={() => setIsOpen(false)}
        onInteractOutside={() => setIsOpen(false)}
      >
        <Command className="rounded-lg border shadow-md">
          <form onSubmit={handleSubmitSearch}>
            <CommandInput 
              placeholder="Type to search..." 
              value={query}
              onValueChange={setQuery}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </form>
          <CommandList>
            <CommandEmpty>
              {isSearching ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Searching...</span>
                </div>
              ) : (
                <p className="p-4 text-center text-sm">No results found.</p>
              )}
            </CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading="Results">
                {results.map((result) => (
                  <CommandItem 
                    key={`${result.type}-${result.id}`}
                    onSelect={() => handleResultSelect(result)}
                    className="flex items-start p-2 cursor-pointer"
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{result.title}</span>
                        {renderResultIcon(result.type)}
                      </div>
                      {result.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1">{result.description}</span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <div className="flex items-center justify-between border-t p-2 bg-muted/50">
            <div className="text-xs text-muted-foreground">
              <kbd className="rounded border bg-muted px-1">Enter</kbd> to select
              <span className="mx-1">•</span>
              <kbd className="rounded border bg-muted px-1">Esc</kbd> to close
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => handleSubmitSearch(e)}
              disabled={results.length === 0}
            >
              View all results
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
