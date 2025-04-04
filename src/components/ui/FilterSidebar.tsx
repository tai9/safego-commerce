import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FilterSidebarProps {
  categories?: string[];
  brands?: string[];
  maxPrice?: number;
  className?: string;
  activeFilters?: {
    dressStyle?: string;
    colors?: string | null;
    size?: string | null;
    priceRange?: number[];
  };
  onFilterChange?: (filters: any) => void;
}

const FilterSidebar = ({ 
  categories = [], 
  brands = [], 
  maxPrice = 500,
  className = "",
  activeFilters,
  onFilterChange
}: FilterSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for active filters - use "all" instead of empty string
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Initialize filters from URL or props
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "all";
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const brandParam = searchParams.get("brand");
    
    setSelectedCategory(categoryParam);
    
    if (minPriceParam && maxPriceParam) {
      setPriceRange([parseInt(minPriceParam), parseInt(maxPriceParam)]);
    } else {
      setPriceRange([0, maxPrice]);
    }
    
    if (brandParam) {
      setSelectedBrands(brandParam.split(","));
    } else {
      setSelectedBrands([]);
    }
  }, [searchParams, maxPrice]);

  // Initialize from activeFilters prop when available
  useEffect(() => {
    if (activeFilters) {
      if (activeFilters.dressStyle) {
        setSelectedCategory(activeFilters.dressStyle);
      }
      if (activeFilters.priceRange) {
        setPriceRange(activeFilters.priceRange);
      }
    }
  }, [activeFilters]);
  
  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Category filter - don't add "all" to URL
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }
    
    // Price range filter
    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    } else {
      params.delete("minPrice");
    }
    
    if (priceRange[1] < maxPrice) {
      params.set("maxPrice", priceRange[1].toString());
    } else {
      params.delete("maxPrice");
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands.join(","));
    } else {
      params.delete("brand");
    }
    
    setSearchParams(params);

    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        dressStyle: selectedCategory,
        priceRange,
        // Add other filters as needed
      });
    }
  };
  
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "all" : category);
  };
  
  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("brand");
    setSearchParams(params);

    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        dressStyle: "all",
        priceRange: [0, maxPrice],
        // Reset other filters as needed
      });
    }
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            value={priceRange}
            max={maxPrice}
            step={1}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center space-x-4 mt-4">
            <div>
              <Label htmlFor="min-price" className="text-sm text-gray-500 dark:text-gray-400">Min</Label>
              <Input
                id="min-price"
                type="number"
                className="w-24 dark:bg-gray-800 dark:border-gray-700"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-sm text-gray-500 dark:text-gray-400">Max</Label>
              <Input
                id="max-price"
                type="number"
                className="w-24 dark:bg-gray-800 dark:border-gray-700"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value <= maxPrice) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Categories</h3>
          <div className="space-y-1.5">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategory === category}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm dark:text-gray-300"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {brands.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Brands</h3>
          <div className="space-y-1.5">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="text-sm dark:text-gray-300"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <Button
          onClick={applyFilters}
          className="flex-1"
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex-1 dark:border-gray-700 dark:text-gray-300"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
