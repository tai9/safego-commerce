
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronDown, Filter, Grid2X2, Grid3X3, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/ui/FilterSidebar";
import MobileFilter from "@/components/ui/MobileFilter";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import ScrollToTop from "@/components/ui/scroll-to-top";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    dressStyle: "",
    colors: null as string | null,
    size: null as string | null,
    priceRange: [0, 500],
  });
  
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  
  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(query);
    
    // Update active filters
    const categoryValue = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    
    setActiveFilters({
      ...activeFilters,
      dressStyle: categoryValue,
      priceRange: [
        minPrice ? parseInt(minPrice) : 0,
        maxPrice ? parseInt(maxPrice) : 500,
      ],
    });
  }, [searchParams, query]);
  
  // Set initial grid cols based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGridCols(2);
      } else if (window.innerWidth < 1024) {
        setGridCols(3);
      } else {
        setGridCols(4);
      }
    };
    
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Filter products based on search query and filters
  const filteredProducts = useMemo(() => {
    if (!query) return [];
    
    return products.filter((product) => {
      // Search match in name or description
      const matchesSearch = 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.dressStyle.some(style => style.toLowerCase().includes(query.toLowerCase()));
      
      if (!matchesSearch) return false;
      
      // Filter by category
      if (categoryParam && !product.category.toLowerCase().includes(categoryParam.toLowerCase())) {
        return false;
      }
      
      // Filter by price
      if (minPriceParam && product.price < parseInt(minPriceParam)) {
        return false;
      }
      
      if (maxPriceParam && product.price > parseInt(maxPriceParam)) {
        return false;
      }
      
      return true;
    });
  }, [query, categoryParam, minPriceParam, maxPriceParam]);
  
  // Sort products
  const sortedProducts = useMemo(() => {
    switch (sortBy) {
      case "price-low":
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case "newest":
        return [...filteredProducts].sort((a, b) => b.id.localeCompare(a.id));
      case "rating":
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }, [filteredProducts, sortBy]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("q", searchQuery.trim());
      setSearchParams(params);
    }
  };
  
  // Extract unique categories
  const categories = [...new Set(products.map((p) => p.category))];
  const maxPrice = Math.max(...products.map((p) => p.price));
  
  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<typeof activeFilters>) => {
    setActiveFilters({
      ...activeFilters,
      ...newFilters,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{query ? `Search: ${query}` : "Search"} | Safego</title>
        <meta name="description" content={`Search results for "${query}" - Find the perfect products at Safego.`} />
      </Helmet>
      <Announcement />
      <Navbar />
      
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-12 py-6 h-14 text-lg rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  <SearchIcon size={20} />
                </button>
              </div>
            </form>
            
            {query && (
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Search results for "{query}"</h1>
                <p className="text-muted-foreground">
                  {sortedProducts.length} {sortedProducts.length === 1 ? "result" : "results"} found
                </p>
              </div>
            )}
          </div>
          
          {query && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <FilterSidebar 
                  categories={categories} 
                  maxPrice={maxPrice}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </aside>
              
              {/* Search Results */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowMobileFilter(true)}
                      className="lg:hidden flex items-center gap-2"
                    >
                      <Filter size={16} />
                      Filters
                    </Button>
                    
                    <div className="hidden lg:flex items-center gap-2">
                      <Button
                        variant={gridCols === 3 ? "default" : "outline"}
                        size="icon"
                        onClick={() => setGridCols(3)}
                        className="w-9 h-9"
                      >
                        <Grid3X3 size={16} />
                      </Button>
                      <Button
                        variant={gridCols === 4 ? "default" : "outline"}
                        size="icon"
                        onClick={() => setGridCols(4)}
                        className="w-9 h-9"
                      >
                        <Grid2X2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {sortedProducts.length > 0 ? (
                  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridCols} gap-4 md:gap-6`}>
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-secondary/20 rounded-lg">
                    <SearchIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Sorry, we couldn't find any products matching "{query}". Try using different keywords or adjusting your filters.
                    </p>
                    <Button onClick={() => setSearchParams({})}>
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Filter Dialog */}
        <MobileFilter
          open={showMobileFilter}
          onClose={() => setShowMobileFilter(false)}
        >
          <FilterSidebar 
            categories={categories} 
            maxPrice={maxPrice}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            className="px-4"
          />
        </MobileFilter>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Search;
