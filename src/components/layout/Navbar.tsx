
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Mobile menu button */}
        <button 
          className="mr-2 md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-black tracking-tighter flex-shrink-0">
          SHOP.CO
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 mx-6">
          <div className="relative group">
            <Link to="/products" className="font-medium hover:opacity-70 transition-opacity py-2">
              Shop
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative group">
            <Link to="/sale" className="font-medium hover:opacity-70 transition-opacity py-2">
              On Sale
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative group">
            <Link to="/new-arrivals" className="font-medium hover:opacity-70 transition-opacity py-2">
              New Arrivals
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative group">
            <Link to="/brands" className="font-medium hover:opacity-70 transition-opacity py-2">
              Brands
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
          </div>
        </nav>
        
        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Input 
              type="search" 
              placeholder="Search for products..." 
              className="w-full bg-secondary border-none rounded-full pl-12 py-6 h-10"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden" 
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link to="/cart" className="p-1 relative" aria-label="Cart">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Link>
          
          <Link to="/account" className="p-1 hidden md:block" aria-label="Account">
            <User size={20} />
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-50 transition-transform duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-heading text-xl font-bold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </Button>
        </div>
        
        <nav className="p-4 space-y-4">
          <Link 
            to="/products" 
            className="block py-2 border-b border-gray-100 text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/sale" 
            className="block py-2 border-b border-gray-100 text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            On Sale
          </Link>
          <Link 
            to="/new-arrivals" 
            className="block py-2 border-b border-gray-100 text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            New Arrivals
          </Link>
          <Link 
            to="/brands" 
            className="block py-2 border-b border-gray-100 text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Brands
          </Link>
          <Link 
            to="/account" 
            className="block py-2 border-b border-gray-100 text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Account
          </Link>
        </nav>
      </div>
      
      {/* Mobile Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="p-0 max-w-md w-[95%] rounded-lg">
          <div className="relative p-4">
            <Input 
              type="search" 
              placeholder="Search for products..." 
              className="w-full border rounded-full pl-12 py-6 h-12"
              autoFocus
            />
            <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
