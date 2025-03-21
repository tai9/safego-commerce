
import { Link } from "react-router-dom";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Home = () => {
  // Get a subset of products for different sections
  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-100 py-8 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 text-center md:text-left animate-slide-in-bottom">
                <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                  FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                  Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <Link 
                  to="/products" 
                  className="btn-primary"
                >
                  Shop Now
                </Link>
                
                <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold">200+</h3>
                    <p className="text-sm text-gray-500">International Brands</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold">2,000+</h3>
                    <p className="text-sm text-gray-500">High-Quality Products</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold">30,000+</h3>
                    <p className="text-sm text-gray-500">Happy Customers</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative animate-fade-in">
                <img
                  src="/lovable-uploads/89e9b281-82ec-42ce-b4ae-47c6c08e9020.png"
                  alt="Fashion models showcasing clothes"
                  className="w-full h-auto rounded-lg"
                />
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-8 animate-pulse">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="black"/>
                  </svg>
                </div>
                <div className="absolute bottom-12 right-12 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Brand logos */}
            <div className="mt-16 border-t border-gray-200 pt-10">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-heading font-bold text-xl">VERSACE</h4>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-heading font-bold text-xl">ZARA</h4>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-heading font-bold text-xl">GUCCI</h4>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-heading font-bold text-xl">PRADA</h4>
                </div>
                <div className="transform hover:scale-105 transition-transform">
                  <h4 className="font-heading font-bold text-xl">Calvin Klein</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">NEW ARRIVALS</h2>
              <Link to="/products" className="text-gray-600 hover:text-black text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="md:grid md:grid-cols-4 md:gap-6 hidden">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="md:hidden">
              <ProductCarousel 
                products={newArrivals} 
                title="NEW ARRIVALS" 
                viewAllLink="/products" 
              />
            </div>
          </div>
        </section>
        
        {/* Top Selling Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">TOP SELLING</h2>
              <Link to="/products" className="text-gray-600 hover:text-black text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="md:grid md:grid-cols-4 md:gap-6 hidden">
              {topSelling.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="md:hidden">
              <ProductCarousel 
                products={topSelling} 
                title="TOP SELLING" 
                viewAllLink="/products" 
              />
            </div>
          </div>
        </section>
        
        {/* Browse by Dress Style */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">BROWSE BY DRESS STYLE</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/products?category=Casual" className="rounded-lg overflow-hidden relative bg-gray-100 aspect-[4/3] hover:opacity-90 transition-opacity">
                  <img 
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                    alt="Casual style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-medium text-xl bg-white px-4 py-2 rounded-lg">Casual</span>
                  </div>
                </Link>
                
                <Link to="/products?category=Formal" className="rounded-lg overflow-hidden relative bg-gray-100 aspect-[4/3] hover:opacity-90 transition-opacity">
                  <img 
                    src="https://images.unsplash.com/photo-1604693618981-f0fe11e5ce6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                    alt="Formal style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-medium text-xl bg-white px-4 py-2 rounded-lg">Formal</span>
                  </div>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/products?category=Party" className="rounded-lg overflow-hidden relative bg-gray-100 aspect-[4/3] hover:opacity-90 transition-opacity">
                  <img 
                    src="https://images.unsplash.com/photo-1522198734915-76c764a8454d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                    alt="Party style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-medium text-xl bg-white px-4 py-2 rounded-lg">Party</span>
                  </div>
                </Link>
                
                <Link to="/products?category=Gym" className="rounded-lg overflow-hidden relative bg-gray-100 aspect-[4/3] hover:opacity-90 transition-opacity">
                  <img 
                    src="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                    alt="Gym style" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-medium text-xl bg-white px-4 py-2 rounded-lg">Gym</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Customer Reviews */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">OUR HAPPY CUSTOMERS</h2>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Review 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h4 className="font-medium mb-1">Sarah M.</h4>
                <p className="text-gray-600 text-sm mb-4">"I'm absolutely thrilled with my purchase! The quality exceeded my expectations, and the style is perfect. Will definitely be ordering more!"</p>
              </div>
              
              {/* Review 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h4 className="font-medium mb-1">Alex K.</h4>
                <p className="text-gray-600 text-sm mb-4">"This is a follow-up to my previous order. Once again, SHOP.CO has delivered a high-quality product that fits perfectly. The customer service was exceptional!"</p>
              </div>
              
              {/* Review 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h4 className="font-medium mb-1">James L.</h4>
                <p className="text-gray-600 text-sm mb-4">"I've been searching for the perfect jeans for months, and I finally found them here! The fit is fantastic, and they arrived quickly and well-packaged."</p>
              </div>
              
              {/* Review 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <Star size={16} className="text-gray-300" />
                </div>
                <h4 className="font-medium mb-1">Maria S.</h4>
                <p className="text-gray-600 text-sm mb-4">"The shirts I ordered are great quality and look exactly like the pictures. The only reason for 4 stars is that shipping took a bit longer than expected."</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
