
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  threshold = 300,
  className = "fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg z-50"
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > threshold);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Check position on component mount
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  if (!showScrollTop) return null;
  
  return (
    <Button
      className={className}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </Button>
  );
};

export default ScrollToTop;
