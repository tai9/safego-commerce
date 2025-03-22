
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/ui/FilterSidebar";
import MobileFilter from "@/components/ui/MobileFilter";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowDownNarrowWide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Products = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Most Popular");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    dressStyle: "",
    colors: null,
    size: null,
    priceRange: [0, 500],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Parse category from URL
  const categoryParam = new URLSearchParams(location.search).get('category') || '';
  
  useEffect(() => {
    if (categoryParam) {
      setActiveFilters(prev => ({...prev, dressStyle: categoryParam}));
    }
  }, [categoryParam]);
  
  // Get filtered products
  const filteredProducts = products.filter(product => {
    // Filter by dress style if selected
    if (activeFilters.dressStyle && !product.dressStyle.includes(activeFilters.dressStyle)) {
      return false;
    }
    
    // Filter by color if selected
    if (activeFilters.colors && !product.colors.includes(activeFilters.colors)) {
      return false;
    }
    
    // Filter by size if selected
    if (activeFilters.size && !product.sizes.includes(activeFilters.size)) {
      return false;
    }
    
    // Filter by price range
    if (product.price < activeFilters.priceRange[0] || product.price > activeFilters.priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Newest":
        return parseInt(b.id) - parseInt(a.id);
      case "Customer Rating":
        return b.rating - a.rating;
      default: // Most Popular
        return b.reviews - a.reviews;
    }
  });
  
  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
  // Reset scroll position when entering the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleFilterChange = (newFilters) => {
    setActiveFilters(prev => ({...prev, ...newFilters}));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const sortOptions = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low", "Customer Rating"];
  
  const clearAllFilters = () => {
    setActiveFilters({
      dressStyle: "",
      colors: null,
      size: null,
      priceRange: [0, 500],
    });
    setCurrentPage(1);
  };
  
  const hasActiveFilters = () => {
    return (
      activeFilters.dressStyle !== "" ||
      activeFilters.colors !== null ||
      activeFilters.size !== null ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 500
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{activeFilters.dressStyle || "All Products"} | Safego Fashion</title>
        <meta name="description" content={`Browse our collection of ${activeFilters.dressStyle || "fashion products"} at Safego.`} />
      </Helmet>
      
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center">
            <Link to="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">{activeFilters.dressStyle || "All Products"}</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">{activeFilters.dressStyle || "All Products"}</h1>
            
            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-2">
              {/* Mobile Filter Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden border rounded-md px-3"
                onClick={() => setMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filter
              </Button>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border rounded-md flex items-center px-3 min-w-[120px] justify-between"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                >
                  <span className="mr-1 hidden md:inline-block">Sort by:</span>
                  <span className="font-medium">{sortOption}</span>
                  <ArrowDownNarrowWide size={16} className="ml-1" />
                </Button>
                
                {sortDropdownOpen && (
                  <div className="absolute right-0 mt-1 bg-background shadow-lg rounded-md z-20 min-w-[180px] border border-border">
                    <ul className="py-1">
                      {sortOptions.map((option) => (
                        <li key={option}>
                          <button
                            className={`w-full text-left px-4 py-2 hover:bg-secondary ${
                              option === sortOption ? "font-medium" : ""
                            }`}
                            onClick={() => {
                              setSortOption(option);
                              setSortDropdownOpen(false);
                            }}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Filter toggle button (Desktop) */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex"
              >
                <SlidersHorizontal size={18} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Desktop Only */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <FilterSidebar 
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} Products
                </div>
                {hasActiveFilters() && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-sm"
                  >
                    <X size={14} className="mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {sortedProducts.length > 0 && (
                <div className="flex justify-center mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNumber;
                        
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
                          <PaginationItem key={i}>
                            <PaginationLink 
                              isActive={currentPage === pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
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
                              onClick={() => setCurrentPage(totalPages)}
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
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

export default Products;
