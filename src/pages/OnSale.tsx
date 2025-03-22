
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { ChevronUp, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const OnSale = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const productsPerPage = 9;
  
  // Filter products - in a real app, this would use a real "on sale" flag
  // For now, we're taking products with odd ids to simulate sale items
  const saleProducts = products.filter(product => product.discount > 0);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = saleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(saleProducts.length / productsPerPage);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Sale Items | Safego Fashion</title>
        <meta name="description" content="Shop our sale items with great discounts at Safego." />
      </Helmet>
      
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center">
            <Link to="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">Sale Items</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="mb-10 bg-red-50 dark:bg-red-900/20 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-red-500 text-white transform rotate-12 p-6 w-32">
              <div className="transform -rotate-12 text-center font-bold">SALE</div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">Special Offers</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
              Browse our collection of discounted items. Limited time offers on selected products with up to 50% off!
            </p>
            
            <div className="flex items-center gap-4">
              <Tag className="text-red-500 dark:text-red-400" size={20} />
              <span className="font-medium">All sale items are final sale. No returns or exchanges.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {currentProducts.length === 0 && (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-medium mb-2">No sale products found</h3>
                <p className="text-muted-foreground">Check back later for new offers!</p>
              </div>
            )}
          </div>
          
          {saleProducts.length > 0 && (
            <div className="flex justify-center mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    let pageNumber;
                    
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </Button>
      )}
      
      <Footer />
    </div>
  );
};

export default OnSale;
