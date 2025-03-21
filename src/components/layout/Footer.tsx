
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      {/* Newsletter */}
      <div className="bg-black text-white rounded-xl py-10 px-8 md:p-12 mx-4 md:mx-8 mb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-bold mb-2">STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS</h3>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none" className="text-white opacity-60">
                      <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 2V2.67L10 7.79L2 2.67V2H18ZM2 14V5.33L9.25 10.04C9.661 10.3 10.164 10.442 10.678 10.4422C11.191 10.4424 11.694 10.3007 12.105 10.04L18 6.33V14H2Z" fill="currentColor"/>
                    </svg>
                  </span>
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full pl-11 pr-4 py-6 h-12 text-white placeholder:text-white placeholder:text-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
                  />
                </div>
                <Button type="submit" className="bg-white hover:bg-white/90 text-black rounded-full font-semibold py-3 px-6 w-full sm:w-auto transition-opacity">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative star elements */}
        <div className="absolute top-4 right-12 transform rotate-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="white" fillOpacity="0.15"/>
          </svg>
        </div>
        <div className="absolute bottom-8 left-16 transform -rotate-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="white" fillOpacity="0.15"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-2xl font-black tracking-tighter mb-4 inline-block">
              SHOP.CO
            </Link>
            <p className="text-sm text-gray-600 mt-4 mb-6 max-w-xs">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">COMPANY</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors">About</Link></li>
              <li><Link to="/features" className="text-gray-600 hover:text-black transition-colors">Features</Link></li>
              <li><Link to="/works" className="text-gray-600 hover:text-black transition-colors">Works</Link></li>
              <li><Link to="/career" className="text-gray-600 hover:text-black transition-colors">Career</Link></li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <h4 className="font-semibold text-lg mb-4">HELP</h4>
            <ul className="space-y-3">
              <li><Link to="/support" className="text-gray-600 hover:text-black transition-colors">Customer Support</Link></li>
              <li><Link to="/delivery" className="text-gray-600 hover:text-black transition-colors">Delivery Details</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* FAQ & Resources (Combined) */}
          <div>
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4">FAQ</h4>
              <ul className="space-y-3">
                <li><Link to="/account" className="text-gray-600 hover:text-black transition-colors">Account</Link></li>
                <li><Link to="/deliveries" className="text-gray-600 hover:text-black transition-colors">Manage Deliveries</Link></li>
                <li><Link to="/orders" className="text-gray-600 hover:text-black transition-colors">Orders</Link></li>
                <li><Link to="/payments" className="text-gray-600 hover:text-black transition-colors">Payments</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">RESOURCES</h4>
              <ul className="space-y-3">
                <li><Link to="/ebooks" className="text-gray-600 hover:text-black transition-colors">Free eBooks</Link></li>
                <li><Link to="/tutorial" className="text-gray-600 hover:text-black transition-colors">Development Tutorial</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-black transition-colors">How to - Blog</Link></li>
                <li><Link to="/playlist" className="text-gray-600 hover:text-black transition-colors">Youtube Playlist</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright & Payment Methods */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          
          <div className="flex items-center space-x-3">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196559.png" alt="Apple Pay" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Google Pay" className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
