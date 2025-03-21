
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { products } from "@/data/products";
import { Search as SearchIcon, Filter, SlidersHorizontal, X } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductSearchSuggestions from "@/components/ui/ProductSearchSuggestions";
import MobileFilter from "@/components/ui/MobileFilter";
import FilterSidebar from "@/components/ui/FilterSidebar";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  // States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    dressStyle: "All",
    colors: null as string | null,
    size: null as string | null,
    priceRange: [0, 500] as number[],
  });
  
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Filter and sort products based on search query and filters
  useEffect(() => {
    let results = [...products];
    
    // Apply search filter
    if (initialQuery) {
      const lowercaseQuery = initialQuery.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.dressStyle.some(style => style.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Apply dress style filter
    if (activeFilters.dressStyle !== "All") {
      results = results.filter(product => 
        product.dressStyle.includes(activeFilters.dressStyle)
      );
    }
    
    // Apply color filter
    if (activeFilters.colors) {
      results = results.filter(product => 
        product.colors.includes(activeFilters.colors!)
      );
    }
    
    // Apply size filter
    if (activeFilters.size) {
      results = results.filter(product => 
        product.sizes.includes(activeFilters.size!)
      );
    }
    
    // Apply price range filter
    results = results.filter(product => 
      product.price >= activeFilters.priceRange[0] && 
      product.price <= activeFilters.priceRange[1]
    );
    
    // Apply sorting
    switch(sortBy) {
      case "price-low-high":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        results.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you would sort by date added
        results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "popularity":
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      default: // relevance, keep original order from search
        break;
    }
    
    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [initialQuery, activeFilters, sortBy]);
  
  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the URL without refreshing
    const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
    navigate(newUrl);
    setShowSuggestions(false);
  };
  
  const handleFilterChange = (newFilters: Partial<typeof activeFilters>) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      dressStyle: "All",
      colors: null,
      size: null,
      priceRange: [0, 500],
    });
    setSortBy("relevance");
  };
  
  const hasActiveFilters = () => {
    return (
      activeFilters.dressStyle !== "All" ||
      activeFilters.colors !== null ||
      activeFilters.size !== null ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 500
    );
  };
  
  // Filtered products for search suggestions
  const suggestionProducts = searchQuery.length > 1 
    ? products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.dressStyle.some(style => style.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5) 
    : [];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{initialQuery ? `Search results for "${initialQuery}" | Safego` : 'Search Products | Safego'}</title>
        <meta name="description" content={`Search results for ${initialQuery} at Safego. Find the latest fashion and clothing.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://safego.com/search?q=${encodeURIComponent(initialQuery)}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {initialQuery ? `Search Results for "${initialQuery}"` : 'Search Products'}
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full pl-12 py-6 h-12 rounded-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 1);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 1)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 rounded-full"
              size="sm"
            >
              <SearchIcon size={18} className="mr-2" />
              Search
            </Button>
            
            {/* Search suggestions */}
            {showSuggestions && suggestionProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-background border border-border rounded-md shadow-lg">
                {suggestionProducts.map((product) => (
                  <button
                    key={product.id}
                    className="w-full text-left p-3 hover:bg-secondary border-b border-border last:border-0 flex items-center"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setShowSuggestions(false);
                    }}
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded mr-3" 
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">${product.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
        
        {initialQuery && (
          <div className="mb-4 text-sm text-muted-foreground">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{initialQuery}"
          </div>
        )}
        
        {filteredProducts.length > 0 && initialQuery && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="md:hidden mr-2"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
                
                {hasActiveFilters() && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-sm flex items-center"
                  >
                    <X size={14} className="mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        {filteredProducts.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar filters - desktop only */}
            <div className="hidden md:block w-64 shrink-0">
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            
            {/* Product grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNumber: number;
                        
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNumber);
                              }}
                              isActive={currentPage === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(totalPages);
                              }}
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        ) : initialQuery ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching "{initialQuery}"
            </p>
            <Button asChild>
              <a href="/products">Browse All Products</a>
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">Enter a search term</h2>
            <p className="text-muted-foreground">
              Type what you're looking for in the search box above
            </p>
          </div>
        )}
      </main>
      
      {/* Mobile Filter Dialog */}
      <MobileFilter
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />
      
      <Footer />
    </div>
  );
};

export default Search;
