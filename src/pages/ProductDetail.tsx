import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Plus, Minus, ChevronDown, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductReviews from "@/components/ui/product-reviews";
import ProductFAQ from "@/components/ui/product-faq";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { products, reviewsData } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState(products[0]); // Default to first product
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
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

  const defaultFaqs = [
    {
      question: "What sizes are available?",
      answer: "We offer sizes ranging from XS to 3XL. Please refer to our size guide to find your perfect fit."
    },
    {
      question: "How do I care for this product?",
      answer: "Machine wash cold with similar colors. Tumble dry low. Do not bleach. Iron if needed on low heat."
    },
    {
      question: "What is your return policy?",
      answer: "We offer free returns within 30 days of purchase. Items must be unworn and in original packaging."
    },
    {
      question: "How long does shipping take?",
      answer: "Orders are typically processed within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on your location."
    }
  ];

  const ratings = [
    { stars: 5, count: Math.round(reviewsData.filter(r => r.rating === 5).length) },
    { stars: 4, count: Math.round(reviewsData.filter(r => r.rating === 4).length) },
    { stars: 3, count: Math.round(reviewsData.filter(r => r.rating === 3).length) },
    { stars: 2, count: Math.round(reviewsData.filter(r => r.rating === 2).length) },
    { stars: 1, count: Math.round(reviewsData.filter(r => r.rating === 1).length) }
  ];
  
  const reviews = reviewsData.map(review => ({
    id: review.id,
    customerName: review.name,
    rating: review.rating,
    date: review.date,
    comment: review.comment,
    helpful: 0,
    verified: review.verified
  }));
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      <Announcement />
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex text-sm items-center dark:text-gray-300">
            <Link to="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Home</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link to="/products" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Shop</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">{product.category}</Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium dark:text-gray-200">{product.name}</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <ProductGallery images={[...product.images, ...product.images]} name={product.name} />
            </div>
            
            <div className="dark:text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{product.name.toUpperCase()}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {product.rating}/5 ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold mr-3">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-400 line-through mr-2">${product.originalPrice}</span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</span>
                  </>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {product.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select Colors</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black dark:border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: colorMap[color] || color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Choose Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size 
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <div className="quantity-input mr-4 flex items-center border border-gray-300 dark:border-gray-700 rounded">
                  <button 
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={addToCart}
                  className="flex-1 bg-black dark:bg-white dark:text-black text-white rounded-full py-3 font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
              
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
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
          
          <div className="mb-16">
            <Tabs defaultValue="details">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <TabsList className="flex w-full bg-transparent justify-center md:justify-start">
                  <TabsTrigger 
                    value="details"
                    className="px-8 py-4 text-base data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
                  >
                    Product Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews"
                    className="px-8 py-4 text-base data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
                  >
                    Rating & Reviews
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faqs"
                    className="px-8 py-4 text-base data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none"
                  >
                    FAQs
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="details" className="py-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Product Information</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 dark:text-white">Materials</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our products are crafted from premium, sustainable materials to ensure comfort and durability.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 dark:text-white">Care Instructions</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Machine wash cold with similar colors. Tumble dry low. Do not bleach. Iron if needed on low heat.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold dark:text-white">All Reviews <span className="text-gray-500 dark:text-gray-400 font-normal">({reviews.length})</span></h3>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border rounded-md flex items-center px-3 dark:border-gray-700 dark:text-gray-200"
                      >
                        <SlidersHorizontal size={16} className="mr-2" />
                        Latest
                        <ChevronDown size={16} className="ml-2" />
                      </Button>
                      
                      <Button className="bg-black dark:bg-white dark:text-black text-white rounded-full px-4 py-2 text-sm">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                  
                  <ProductReviews
                    overallRating={product.rating}
                    totalReviews={reviews.length}
                    ratings={ratings}
                    reviews={reviews}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="faqs" className="py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold dark:text-white">FAQs</h3>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border rounded-md flex items-center px-3 dark:border-gray-700 dark:text-gray-200"
                      >
                        <SlidersHorizontal size={16} className="mr-2" />
                        Latest
                        <ChevronDown size={16} className="ml-2" />
                      </Button>
                      
                      <Button className="bg-black dark:bg-white dark:text-black text-white rounded-full px-4 py-2 text-sm">
                        Write a Question
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-16">
                    <style>
                      {`
                        .faq-answer {
                          max-height: 0;
                          overflow: hidden;
                          transition: max-height 0.3s ease-out;
                        }
                        .faq-active .faq-answer {
                          max-height: 500px;
                          transition: max-height 0.5s ease-in;
                        }
                      `}
                    </style>
                    <ProductFAQ faqs={product.faqs || defaultFaqs} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center dark:text-white">YOU MIGHT ALSO LIKE</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />

      <style jsx>{`
        .size-btn {
          min-width: 40px;
          height: 40px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
