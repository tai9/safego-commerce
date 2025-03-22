
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export interface MobileFilterProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileFilter = ({ open, onClose, children }: MobileFilterProps) => {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <SheetContent side="left" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left">Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-[calc(100vh-10rem)] overflow-y-auto pb-20">
          {children}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button 
            onClick={onClose}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilter;
