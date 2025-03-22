
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const NewArrivals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const productsPerPage = 9;
  
  // Filter products - in a real app, this would use the actual "new arrival" flag or date
  // For now, we're taking the products with the highest IDs to simulate newest products
  const newArrivalsProducts = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 12); // Show only the 12 newest products
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = newArrivalsProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(newArrivalsProducts.length / productsPerPage);
  
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
        <title>New Arrivals | Safego Fashion</title>
        <meta name="description" content="Check out our latest fashion arrivals at Safego." />
      </Helmet>
      
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center">
            <Link to="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">New Arrivals</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">New Arrivals</h1>
            <p className="text-muted-foreground">Fresh styles just landed</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {newArrivalsProducts.length > 0 && (
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

export default NewArrivals;
