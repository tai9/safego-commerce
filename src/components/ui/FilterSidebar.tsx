
import { useState } from "react";
import { ChevronUp, ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className }) => {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [filters, setFilters] = useState({
    categories: { open: true },
    price: { open: true },
    colors: { open: true },
    size: { open: true },
    dressStyle: { open: true }
  });
  
  // Selected filters state
  const [selectedColor, setSelectedColor] = useState<string | null>("blue");
  const [selectedSize, setSelectedSize] = useState<string | null>("Large");
  
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
  
  const toggleSection = (section: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [section]: { ...prev[section], open: !prev[section].open }
    }));
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Filters</h3>
        <SlidersHorizontal size={18} className="text-gray-500" />
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('categories')}
        >
          <span className="font-medium">T-shirts</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('categories')}
        >
          <span className="font-medium">Shorts</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('categories')}
        >
          <span className="font-medium">Shirts</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('categories')}
        >
          <span className="font-medium">Hoodie</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('categories')}
        >
          <span className="font-medium">Jeans</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <button 
          className="filter-item"
          onClick={() => toggleSection('price')}
        >
          <span className="font-medium">Price</span>
          {filters.price.open ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
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
          {filters.colors.open ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
        </button>
        
        {filters.colors.open && (
          <div className="py-4 grid grid-cols-5 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`color-selector ${selectedColor === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
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
          {filters.size.open ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
        </button>
        
        {filters.size.open && (
          <div className="py-4 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-selector ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
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
          {filters.dressStyle.open ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('dressStyle')}
        >
          <span className="font-medium">Casual</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('dressStyle')}
        >
          <span className="font-medium">Formal</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('dressStyle')}
        >
          <span className="font-medium">Party</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
        
        <button 
          className="filter-item"
          onClick={() => toggleSection('dressStyle')}
        >
          <span className="font-medium">Gym</span>
          <ChevronDown size={18} className="text-gray-500" />
        </button>
      </div>
      
      {/* Apply Filter Button */}
      <Button className="w-full bg-black text-white rounded-full py-3 font-medium">
        Apply Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
