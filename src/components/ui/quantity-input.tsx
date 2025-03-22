
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantityInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const QuantityInput = React.forwardRef<HTMLDivElement, QuantityInputProps>(
  ({ value, onValueChange, min = 1, max = 99, step = 1, className, size = "md", ...props }, ref) => {
    const handleDecrease = () => {
      if (value > min) {
        onValueChange(value - step);
      }
    };

    const handleIncrease = () => {
      if (value < max) {
        onValueChange(value + step);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        onValueChange(Math.max(min, Math.min(max, newValue)));
      }
    };

    const sizeClasses = {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center rounded-full border border-input overflow-hidden bg-background",
          sizeClasses[size],
          className
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-l-full h-full hover:bg-muted",
            sizeClasses[size]
          )}
          onClick={handleDecrease}
          disabled={value <= min}
        >
          <Minus size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
        </Button>
        
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleInputChange}
          className={cn(
            "h-full border-0 rounded-none text-center focus-visible:ring-0 focus-visible:ring-offset-0 p-0",
            size === "sm" ? "w-8" : size === "md" ? "w-10" : "w-14"
          )}
          min={min}
          max={max}
          {...props}
        />
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-r-full h-full hover:bg-muted",
            sizeClasses[size]
          )}
          onClick={handleIncrease}
          disabled={value >= max}
        >
          <Plus size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
        </Button>
      </div>
    );
  }
);

QuantityInput.displayName = "QuantityInput";

export { QuantityInput };
