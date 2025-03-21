
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FilterSidebar from "./FilterSidebar";
import { Button } from "@/components/ui/button";

interface MobileFilterProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: {
    dressStyle: string;
    colors: string | null;
    size: string | null;
    priceRange: number[];
  };
  onFilterChange: (filters: any) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({ 
  isOpen, 
  onClose, 
  activeFilters, 
  onFilterChange 
}) => {
  const handleFilterChange = (filters) => {
    onFilterChange(filters);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 h-[90vh] max-h-[900px] overflow-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
          <h2 className="font-medium text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-4">
          <FilterSidebar 
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileFilter;
