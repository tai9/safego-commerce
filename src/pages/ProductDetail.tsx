
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Plus, Minus, ChevronDown, ChevronUp, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import ProductGallery from "@/components/ui/ProductGallery";
import ReviewCard from "@/components/ui/ReviewCard";
import { products, reviewsData } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState(products[0]); // Default to first product
  
  // Find the product by ID
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default selections
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);
  
  // Reset scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Related products (random 4 products that are not the current one)
  const relatedProducts = products
    .filter(p => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const addToCart = () => {
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    // Add to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
      action: (
        <Button 
          onClick={() => navigate('/cart')} 
          variant="default" 
          size="sm"
          className="bg-primary text-white px-3 py-1 rounded-md text-xs"
        >
          View Cart
        </Button>
      ),
    });
  };
  
  // Color mapping for the UI
  const colorMap: Record<string, string> = {
    'white': '#ffffff',
    'black': '#000000',
    'red': '#ef4444',
    'blue': '#3b82f6',
    'green': '#22c55e',
    'yellow': '#eab308',
    'purple': '#a855f7',
    'pink': '#ec4899',
    'orange': '#f97316',
    'gray': '#9ca3af',
    'brown': '#92400e',
  };
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center">
            <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link to="/products" className="text-gray-500 hover:text-black">Shop</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-black">{product.category}</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div>
              <ProductGallery images={[...product.images, ...product.images]} name={product.name} />
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{product.name.toUpperCase()}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating}/5 ({product.reviews} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold mr-3">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-400 line-through mr-2">${product.originalPrice}</span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</span>
                  </>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-8">
                {product.description}
              </p>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select Colors</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-selector ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: colorMap[color] || color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Choose Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-selector ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex items-center mb-8">
                <div className="quantity-input mr-4">
                  <button 
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={addToCart}
                  className="flex-1 bg-black text-white rounded-full py-3 font-medium hover:bg-black/90 transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
              
              {/* Additional Info (Delivery, etc.) */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center text-sm">
                  <CheckCircle2 size={16} className="mr-2 text-green-500" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle2 size={16} className="mr-2 text-green-500" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle2 size={16} className="mr-2 text-green-500" />
                  <span>Secure payment guaranteed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details, Reviews, FAQs Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="reviews">
              <div className="border-b border-gray-200">
                <TabsList className="flex w-full bg-transparent justify-center md:justify-start">
                  <TabsTrigger 
                    value="details"
                    className="px-8 py-4 text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
                  >
                    Product Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews"
                    className="px-8 py-4 text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
                  >
                    Rating & Reviews
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faqs"
                    className="px-8 py-4 text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
                  >
                    FAQs
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="details" className="py-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold mb-4">Product Information</h3>
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Materials</h4>
                      <p className="text-gray-600">
                        Our products are crafted from premium, sustainable materials to ensure comfort and durability.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Care Instructions</h4>
                      <p className="text-gray-600">
                        Machine wash cold with similar colors. Tumble dry low. Do not bleach. Iron if needed on low heat.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">All Reviews <span className="text-gray-500 font-normal">({reviewsData.length})</span></h3>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border rounded-md flex items-center px-3"
                      >
                        <SlidersHorizontal size={16} className="mr-2" />
                        Latest
                        <ChevronDown size={16} className="ml-2" />
                      </Button>
                      
                      <Button className="bg-black text-white rounded-full px-4 py-2 text-sm">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {reviewsData.map((review) => (
                      <ReviewCard
                        key={review.id}
                        name={review.name}
                        rating={review.rating}
                        date={review.date}
                        comment={review.comment}
                        verified={review.verified}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button variant="outline" className="px-6 py-2 rounded-md">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faqs" className="py-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <button 
                        className="flex justify-between items-center w-full text-left font-medium"
                        onClick={() => {}}
                      >
                        <span>What sizes are available?</span>
                        <ChevronDown size={18} />
                      </button>
                      <div className="mt-2 text-gray-600">
                        We offer sizes ranging from XS to 3XL. Please refer to our size guide to find your perfect fit.
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <button 
                        className="flex justify-between items-center w-full text-left font-medium"
                        onClick={() => {}}
                      >
                        <span>How do I care for this product?</span>
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <button 
                        className="flex justify-between items-center w-full text-left font-medium"
                        onClick={() => {}}
                      >
                        <span>What is your return policy?</span>
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <button 
                        className="flex justify-between items-center w-full text-left font-medium"
                        onClick={() => {}}
                      >
                        <span>How long does shipping take?</span>
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <button 
                        className="flex justify-between items-center w-full text-left font-medium"
                        onClick={() => {}}
                      >
                        <span>Do you ship internationally?</span>
                        <ChevronDown size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* You Might Also Like */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">YOU MIGHT ALSO LIKE</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
