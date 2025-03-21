
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useTheme } from "@/hooks/use-theme";
import ProductSearchSuggestions from "@/components/ui/ProductSearchSuggestions";
import { products } from "@/data/products";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isSignedIn } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // Filter products based on search query for suggestions
  const filteredProducts = searchQuery.length > 1 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.dressStyle.some(style => style.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5) 
    : [];
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 1);
  };

  const handleSuggestionClick = (productName: string) => {
    setSearchQuery(productName);
    handleSearch({ preventDefault: () => {} } as React.FormEvent);
  };
  
  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-background shadow-sm" : "bg-background"}`}>
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
          Safego
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 mx-6">
          <div className="relative group">
            <Link to="/products" className="font-medium hover:opacity-70 transition-opacity py-2">
              Shop
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative group">
            <Link to="/sale" className="font-medium hover:opacity-70 transition-opacity py-2">
              On Sale
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative group">
            <Link to="/new-arrivals" className="font-medium hover:opacity-70 transition-opacity py-2">
              New Arrivals
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative group">
            <Link to="/brands" className="font-medium hover:opacity-70 transition-opacity py-2">
              Brands
            </Link>
            <span className="absolute -bottom-[2px] left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
          </div>
        </nav>
        
        {/* Search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <div className="relative w-full">
            <Input 
              type="search" 
              placeholder="Search for products..." 
              className="w-full bg-secondary border-none rounded-full pl-12 py-6 h-10"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 1)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </button>
          </div>
          
          {/* Search suggestions */}
          {showSuggestions && filteredProducts.length > 0 && (
            <ProductSearchSuggestions 
              products={filteredProducts} 
              onSelect={handleSuggestionClick}
            />
          )}
        </form>
        
        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden" 
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-1"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
          
          <Link to="/cart" className="p-1 relative" aria-label="Cart">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Link>
          
          {isSignedIn ? (
            <div className="p-1">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background z-50 transition-transform duration-300 transform ${
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
          {isSignedIn ? (
            <Link 
              to="/profile" 
              className="block py-2 border-b border-gray-100 text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          ) : (
            <>
              <div className="py-2 border-b border-gray-100">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-lg font-medium">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
              <div className="py-2 border-b border-gray-100">
                <SignUpButton mode="modal">
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-lg font-medium">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </>
          )}
          
          <div className="py-2 border-b border-gray-100">
            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-lg font-medium"
            >
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="p-0 max-w-md w-[95%] rounded-lg">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <form onSubmit={handleSearch} className="relative p-4">
            <Input 
              type="search" 
              placeholder="Search for products..." 
              className="w-full border rounded-full pl-12 py-6 h-12"
              autoFocus
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="absolute left-8 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </button>
            
            {/* Mobile search suggestions */}
            {searchQuery.length > 1 && filteredProducts.length > 0 && (
              <div className="mt-2 bg-background rounded-md shadow-md max-h-60 overflow-auto">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    className="w-full text-left p-3 hover:bg-secondary border-b border-border last:border-0 flex items-center"
                    onClick={() => {
                      setSearchQuery(product.name);
                      setSearchOpen(false);
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-10 h-10 object-cover rounded mr-3" 
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">${product.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
