
import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Announcement from "@/components/layout/Announcement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

// Sample cart data
const initialCartItems = [
  {
    id: "1",
    name: "Gradient Graphic T-shirt",
    price: 145,
    image: "/lovable-uploads/cd011f2c-675c-4750-8cc2-421974b43274.png",
    size: "Large",
    color: "White",
    quantity: 1
  },
  {
    id: "5",
    name: "Checkered Shirt",
    price: 180,
    image: "/lovable-uploads/50e38023-1ab4-4395-a99a-ef9d85a27d9d.png",
    size: "Medium",
    color: "Red",
    quantity: 1
  },
  {
    id: "4",
    name: "Skinny Fit Jeans",
    price: 240,
    image: "/lovable-uploads/64341d02-b9c7-4e17-a103-2435e22dd3ef.png",
    size: "Large",
    color: "Blue",
    quantity: 1
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * 0.2); // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart"
    });
  };
  
  const applyPromoCode = () => {
    if (promoCode.trim() === "") {
      toast({
        title: "Please enter a promo code",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Promo code applied",
      description: "The discount has been applied to your order"
    });
  };
  
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
            <span className="font-medium">Cart</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-12">YOUR CART</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link 
                to="/products" 
                className="btn-primary"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-6 border-b pb-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-center rounded-md"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                          <p className="text-sm text-gray-500 mb-3">Color: {item.color}</p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm flex items-center hover:text-red-700"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between">
                          <div className="quantity-input mb-0 sm:mb-4">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-medium">${item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount (-20%)</span>
                    <span className="font-medium text-red-500">-${discount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee}</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-xl">${total}</span>
                    </div>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Tag size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm">Add promo code</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 rounded-full"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      className="bg-black text-white rounded-full px-4 hover:bg-black/90 transition-colors"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <Button 
                  className="w-full bg-black text-white rounded-full py-6 font-medium hover:bg-black/90 transition-colors flex items-center justify-center"
                >
                  Go to Checkout
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
