import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, Filter, Grid2X2, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/ui/FilterSidebar";
import MobileFilter from "@/components/ui/MobileFilter";
import ProductCard from "@/components/ui/ProductCard";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { products } from "@/data/products";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [sortBy, setSortBy] = useState("featured");
  const [activeFilters, setActiveFilters] = useState({
    dressStyle: "all",
    colors: "",
    size: "",
    priceRange: [0, 500],
  });
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGridCols(2);
      } else {
        setGridCols(4);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category") || "all";
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    
    setActiveFilters({
      ...activeFilters,
      dressStyle: categoryParam,
      priceRange: [
        minPriceParam ? parseInt(minPriceParam) : 0,
        maxPriceParam ? parseInt(maxPriceParam) : 500,
      ],
    });
  }, [searchParams]);
  
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const searchQuery = searchParams.get("q");
  
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (categoryParam && categoryParam !== "all" && !product.category.toLowerCase().includes(categoryParam.toLowerCase())) {
        return false;
      }
      
      if (minPriceParam && product.price < parseInt(minPriceParam)) {
        return false;
      }
      
      if (maxPriceParam && product.price > parseInt(maxPriceParam)) {
        return false;
      }
      
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [categoryParam, brandParam, minPriceParam, maxPriceParam, searchQuery]);
  
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
  
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(["Nike", "Adidas", "Puma", "Under Armour", "New Balance"])];
  const maxPrice = Math.max(...products.map((p) => p.price));

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters({
      ...activeFilters,
      ...newFilters,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col mb-8">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">
              {categoryParam && categoryParam !== "all" ? categoryParam : "All Products"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {sortedProducts.length} products found
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="hidden md:block w-64 shrink-0">
              <FilterSidebar 
                categories={categories} 
                brands={brands} 
                maxPrice={maxPrice}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </aside>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMobileFilter(true)}
                    className="md:hidden flex items-center gap-2 dark:border-gray-700 dark:text-gray-200"
                  >
                    <Filter size={16} />
                    Filters
                  </Button>
                  
                  <div className="hidden md:flex items-center gap-2">
                    <Button
                      variant={gridCols === 3 ? "default" : "outline"}
                      size="icon"
                      onClick={() => setGridCols(3)}
                      className="w-9 h-9 dark:border-gray-700 dark:text-gray-200"
                    >
                      <Grid3X3 size={16} />
                    </Button>
                    <Button
                      variant={gridCols === 4 ? "default" : "outline"}
                      size="icon"
                      onClick={() => setGridCols(4)}
                      className="w-9 h-9 dark:border-gray-700 dark:text-gray-200"
                    >
                      <Grid2X2 size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm mr-2 dark:text-gray-300">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] dark:border-gray-700 dark:text-gray-200 dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className={`grid grid-cols-2 md:grid-cols-${gridCols} gap-4 md:gap-6`}>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">No products found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <MobileFilter
          open={showMobileFilter}
          onClose={() => setShowMobileFilter(false)}
        >
          <FilterSidebar 
            categories={categories} 
            brands={brands} 
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

export default Products;
