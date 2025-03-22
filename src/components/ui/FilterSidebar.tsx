
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  className?: string;
  activeFilters: {
    dressStyle: string;
    colors: string | null;
    size: string | null;
    priceRange: number[];
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  className, 
  activeFilters, 
  onFilterChange 
}) => {
  const [priceRange, setPriceRange] = useState(activeFilters.priceRange);
  const [filters, setFilters] = useState({
    categories: { open: true },
    price: { open: true },
    colors: { open: true },
    size: { open: true },
    dressStyle: { open: true }
  });
  
  // Update local state when props change
  useEffect(() => {
    setPriceRange(activeFilters.priceRange);
  }, [activeFilters.priceRange]);
  
  const colors = [
    { name: "green", value: "#22c55e" },
    { name: "red", value: "#ef4444" },
    { name: "yellow", value: "#eab308" },
    { name: "orange", value: "#f97316" },
    { name: "sky", value: "#0ea5e9" },
    { name: "blue", value: "#3b82f6" },
    { name: "purple", value: "#a855f7" },
    { name: "pink", value: "#ec4899" },
    { name: "white", value: "#ffffff" },
    { name: "black", value: "#000000" }
  ];
  
  const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
  const dressStyles = ["All", "Casual", "Formal", "Party", "Gym"];
  
  const toggleSection = (section: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [section]: { ...prev[section], open: !prev[section].open }
    }));
  };
  
  const handleApplyFilter = () => {
    onFilterChange({ priceRange });
  };
  
  const handleSelectColor = (color: string) => {
    onFilterChange({ colors: activeFilters.colors === color ? null : color });
  };
  
  const handleSelectSize = (size: string) => {
    onFilterChange({ size: activeFilters.size === size ? null : size });
  };
  
  const handleSelectDressStyle = (style: string) => {
    onFilterChange({ dressStyle: style });
  };
  
  const clearAllFilters = () => {
    // Reset price range locally
    setPriceRange([0, 500]);
    
    // Reset all filters 
    onFilterChange({
      dressStyle: "All",
      colors: null,
      size: null,
      priceRange: [0, 500],
    });
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
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Filters</h3>
        <div className="flex items-center">
          {hasActiveFilters() && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="mr-2 text-xs"
            >
              <X size={14} className="mr-1" />
              Clear All
            </Button>
          )}
          <SlidersHorizontal size={18} className="text-muted-foreground" />
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('categories')}
        >
          <span className="font-medium">Categories</span>
          {filters.categories.open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
        </button>
        
        {filters.categories.open && (
          <div className="py-2">
            <button 
              className="filter-item pl-2"
              onClick={() => {}}
            >
              <span className="font-medium">T-shirts</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            
            <button 
              className="filter-item pl-2"
              onClick={() => {}}
            >
              <span className="font-medium">Shorts</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            
            <button 
              className="filter-item pl-2"
              onClick={() => {}}
            >
              <span className="font-medium">Shirts</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            
            <button 
              className="filter-item pl-2"
              onClick={() => {}}
            >
              <span className="font-medium">Hoodie</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
            
            <button 
              className="filter-item pl-2"
              onClick={() => {}}
            >
              <span className="font-medium">Jeans</span>
              <ChevronDown size={18} className="text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('price')}
        >
          <span className="font-medium">Price</span>
          {filters.price.open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
        </button>
        
        {filters.price.open && (
          <div className="py-4 px-1">
            <Slider
              value={priceRange}
              min={0}
              max={500}
              step={1}
              onValueChange={setPriceRange}
              className="my-4"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">${priceRange[0]}</span>
              <span className="font-medium">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Colors */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('colors')}
        >
          <span className="font-medium">Colors</span>
          {filters.colors.open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
        </button>
        
        {filters.colors.open && (
          <div className="py-4 grid grid-cols-5 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`color-selector ${activeFilters.colors === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => handleSelectColor(color.name)}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Sizes */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('size')}
        >
          <span className="font-medium">Size</span>
          {filters.size.open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
        </button>
        
        {filters.size.open && (
          <div className="py-4 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-selector ${activeFilters.size === size ? 'active' : ''}`}
                onClick={() => handleSelectSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Dress Style */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('dressStyle')}
        >
          <span className="font-medium">Dress Style</span>
          {filters.dressStyle.open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
        </button>
        
        {filters.dressStyle.open && (
          <div className="py-2">
            {dressStyles.map(style => (
              <button 
                key={style}
                className={`filter-item pl-2 ${activeFilters.dressStyle === style ? 'font-bold' : ''}`}
                onClick={() => handleSelectDressStyle(style)}
              >
                <span className="font-medium">{style}</span>
                {activeFilters.dressStyle === style && <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Selected</span>}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Apply Filter Button */}
      <Button 
        className="w-full bg-primary text-primary-foreground rounded-full py-3 font-medium"
        onClick={handleApplyFilter}
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
