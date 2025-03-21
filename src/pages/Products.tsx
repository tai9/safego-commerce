
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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

const Products = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Most Popular");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Parse category from URL
  const categoryParam = new URLSearchParams(location.search).get('category') || 'Casual';
  
  // Get filtered products
  const filteredProducts = products.filter(product => 
    product.dressStyle.includes(categoryParam)
  );
  
  // Reset scroll position when entering the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const sortOptions = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low", "Customer Rating"];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center">
            <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">{categoryParam}</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">{categoryParam}</h1>
            
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
                  <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md z-20 min-w-[180px]">
                    <ul className="py-1">
                      {sortOptions.map((option) => (
                        <li key={option}>
                          <button
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
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
              <FilterSidebar />
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-6">
                Showing 1-{filteredProducts.length} of {filteredProducts.length} Products
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="flex justify-center items-center mt-10">
                  <button className="px-3 py-2 border rounded-md flex items-center text-sm mr-2 hover:bg-gray-50">
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md bg-black text-white">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">3</button>
                    <span className="w-8 h-8 flex items-center justify-center">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">8</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">9</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100">10</button>
                  </div>
                  
                  <button className="px-3 py-2 border rounded-md flex items-center text-sm ml-2 hover:bg-gray-50">
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Filter Dialog */}
      <MobileFilter isOpen={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} />
      
      <Footer />
    </div>
  );
};

export default Products;
