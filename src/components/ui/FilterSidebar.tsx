
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  maxPrice: number;
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  maxPrice,
  className,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize from URL params
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";
  const initialPriceMin = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice") || "0") : 0;
  const initialPriceMax = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice") || String(maxPrice)) : maxPrice;
  
  // Local state for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialPriceMin,
    initialPriceMax,
  ]);
  
  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    // Update category params
    if (selectedCategories.length) {
      newParams.set("category", selectedCategories.join(","));
    } else {
      newParams.delete("category");
    }
    
    // Update brand params
    if (selectedBrands.length) {
      newParams.set("brand", selectedBrands.join(","));
    } else {
      newParams.delete("brand");
    }
    
    // Update price params
    if (priceRange[0] > 0) {
      newParams.set("minPrice", priceRange[0].toString());
    } else {
      newParams.delete("minPrice");
    }
    
    if (priceRange[1] < maxPrice) {
      newParams.set("maxPrice", priceRange[1].toString());
    } else {
      newParams.delete("maxPrice");
    }
    
    setSearchParams(newParams);
  }, [selectedCategories, selectedBrands, priceRange]);
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };
  
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium mb-3 dark:text-white">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked === true)
                }
                className="mr-2 h-4 w-4 text-primary"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3 dark:text-white">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand, checked === true)
                }
                className="mr-2 h-4 w-4 text-primary"
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3 dark:text-white">Price Range</h3>
        <Slider
          value={[priceRange[0], priceRange[1]]}
          min={0}
          max={maxPrice}
          step={10}
          onValueChange={handlePriceChange}
          className="my-6"
        />
        <div className="flex items-center justify-between text-sm dark:text-gray-300">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={clearFilters}
        className="w-full mt-4 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
