
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter products based on search query
  useEffect(() => {
    if (initialQuery) {
      const lowercaseQuery = initialQuery.toLowerCase();
      const results = products.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.dressStyle.some(style => style.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [initialQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the URL without refreshing
    const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    // Filter products
    const lowercaseQuery = searchQuery.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.dressStyle.some(style => style.toLowerCase().includes(lowercaseQuery))
    );
    setFilteredProducts(results);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{initialQuery ? `Search results for "${initialQuery}" | SHOP.CO` : 'Search Products | SHOP.CO'}</title>
        <meta name="description" content={`Search results for ${initialQuery} at SHOP.CO. Find the latest fashion and clothing.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://shop.co/search?q=${encodeURIComponent(initialQuery)}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {initialQuery ? `Search Results for "${initialQuery}"` : 'Search Products'}
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full pl-12 py-6 h-12 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 rounded-full"
              size="sm"
            >
              <SearchIcon size={18} className="mr-2" />
              Search
            </Button>
          </form>
        </div>
        
        {initialQuery && (
          <div className="mb-4 text-sm text-gray-500">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{initialQuery}"
          </div>
        )}
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : initialQuery ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-gray-500 mb-6">
              We couldn't find any products matching "{initialQuery}"
            </p>
            <Button asChild>
              <a href="/products">Browse All Products</a>
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">Enter a search term</h2>
            <p className="text-gray-500">
              Type what you're looking for in the search box above
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
