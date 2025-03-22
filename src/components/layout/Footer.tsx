
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Subscription successful!",
      description: "You've been added to our newsletter.",
    });
    
    setEmail("");
  };
  
  return (
    <footer className="bg-white dark:bg-gray-900 pt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-white">FASHION</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover the latest trends in fashion and explore our wide selection of clothing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-white">Shop</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/products" className="hover:text-black dark:hover:text-white">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=T-shirts" className="hover:text-black dark:hover:text-white">T-shirts</Link>
              </li>
              <li>
                <Link to="/products?category=Shirts" className="hover:text-black dark:hover:text-white">Shirts</Link>
              </li>
              <li>
                <Link to="/products?category=Jeans" className="hover:text-black dark:hover:text-white">Jeans</Link>
              </li>
              <li>
                <Link to="/products?category=Shorts" className="hover:text-black dark:hover:text-white">Shorts</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-white">Help</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="#" className="hover:text-black dark:hover:text-white">Customer Service</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black dark:hover:text-white">My Account</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black dark:hover:text-white">Find a Store</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black dark:hover:text-white">Size Guides</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black dark:hover:text-white">FAQs</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-white">STAY UP TO DATE</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter to receive special offers and first look at new products.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <Button type="submit" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="py-6 text-center border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Fashion Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
