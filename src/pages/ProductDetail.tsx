
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, ChevronRight, ArrowRight, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { QuantityInput } from '@/components/ui/quantity-input';
import ProductGallery from '@/components/ui/ProductGallery';
import ProductReviews from '@/components/ui/product-reviews';
import ProductFAQ from '@/components/ui/product-faq';
import ScrollToTop from '@/components/ui/scroll-to-top';
import { products, Product, reviewsData } from '@/data/products';

const ProductDetail = () => {
  // Get the product ID from URL params
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch product details
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Set default selections
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
    
    // Scroll to the top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    setIsLoading(true);
    
    // Simulate adding to cart with delay
    setTimeout(() => {
      toast.success("Item added to your cart!");
      setIsLoading(false);
    }, 600);
  };

  const getColorHex = (colorName: string) => {
    const colorMap: Record<string, string> = {
      'white': '#ffffff',
      'black': '#000000',
      'blue': '#0066cc',
      'red': '#ff0000',
      'green': '#00a651',
      'yellow': '#ffff00',
      'purple': '#800080',
      'gray': '#808080',
      'brown': '#92400e',
      'orange': '#ffa500',
      'khaki': '#c3b091',
    };

    return colorMap[colorName.toLowerCase()] || '#cccccc';
  };

  const defaultFaqs = [
    {
      question: "What sizes are available?",
      answer: "We offer sizes ranging from XS to 3XL. Please refer to our size guide to find your perfect fit."
    },
    {
      question: "How do I care for this item?",
      answer: "For best results, machine wash cold with like colors, gentle cycle. Tumble dry low. Do not bleach. Iron on low if needed."
    },
    {
      question: "What is the return policy?",
      answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Please see our Returns page for more details."
    },
    {
      question: "How long will shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping may take 7-14 business days."
    },
    {
      question: "Is this true to size?",
      answer: "Yes, this item is true to size for most customers. If you're between sizes, we recommend sizing up for a more comfortable fit."
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
    verified: review.verified,
    comment: review.comment
  }));

  return (
    <>
      <Helmet>
        <title>{product.name} | Lovable Store</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <ScrollToTop />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="mx-1"><ChevronRight className="h-4 w-4" /></span>
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li>
              <span className="mx-1"><ChevronRight className="h-4 w-4" /></span>
            </li>
            <li>
              <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">{product.category}</Link>
            </li>
            <li>
              <span className="mx-1"><ChevronRight className="h-4 w-4" /></span>
            </li>
            <li>
              <span className="font-medium text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating} ({product.reviews})</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <span className="text-sm">{product.reviews} reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <Badge variant="destructive" className="text-xs">{product.discount}% OFF</Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Color: <span className="font-normal">{selectedColor}</span></h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full focus:outline-none border-2 ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : 'ring-transparent'
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                    {selectedColor === color && color.toLowerCase() === 'white' && (
                      <Check className="w-5 h-5 text-black mx-auto" />
                    )}
                    {selectedColor === color && color.toLowerCase() !== 'white' && (
                      <Check className="w-5 h-5 text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Size: <span className="font-normal">{selectedSize}</span></h3>
                <button className="text-sm underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`border rounded py-2 text-center text-sm focus:outline-none ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-2">Quantity:</h3>
              <QuantityInput 
                value={quantity} 
                onValueChange={setQuantity} 
                min={1} 
                max={10} 
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button className="flex-1" onClick={handleAddToCart} disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-b py-4 space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-sm">Free shipping over $100</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-sm">30 days return policy</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-sm">100% secure checkout</span>
              </div>
            </div>

            <div>
              <Button variant="link" className="flex items-center p-0 text-sm">
                <span>View full details</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* More Product Information */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-lg mx-auto mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                <p className="mb-4">{product.description}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-2">Features</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Premium quality material</li>
                      <li>Comfortable fit</li>
                      <li>Durable stitching</li>
                      <li>Easy to care for</li>
                      <li>Stylish design</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Specifications</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Material</span>
                        <span>100% Cotton</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Style</span>
                        <span>{product.dressStyle.join(', ')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Neck Type</span>
                        <span>Round Neck</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Sleeve</span>
                        <span>Short Sleeve</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Care</span>
                        <span>Machine Wash</span>
                      </div>
                    </div>
                  </div>
                </div>
                  
                <div className="mt-16">
                  <style>{`
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
            
            <TabsContent value="reviews">
              <div className="max-w-3xl mx-auto">
                <ProductReviews 
                  overallRating={product.rating}
                  totalReviews={product.reviews}
                  ratings={ratings} 
                  reviews={reviews} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="shipping">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Shipping & Returns</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                    <p className="mb-4">We offer the following shipping options:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><span className="font-medium">Standard Shipping:</span> 3-5 business days (Free on orders over $100)</li>
                      <li><span className="font-medium">Express Shipping:</span> 1-2 business days ($15)</li>
                      <li><span className="font-medium">International Shipping:</span> 7-14 business days (Rates calculated at checkout)</li>
                    </ul>
                    <p className="mt-4">Orders are processed and shipped Monday-Friday, excluding holidays. Orders placed after 12 PM may be processed the following business day.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
                    <p className="mb-4">We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept returns under the following conditions:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Items must be returned within 30 days of delivery</li>
                      <li>Products must be unworn, unwashed, and in original condition with tags attached</li>
                      <li>Return shipping costs are the responsibility of the customer</li>
                      <li>Sale items can only be exchanged for store credit</li>
                    </ul>
                    <p className="mt-4">To initiate a return, please contact our customer service team at support@example.com or visit your account page.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
