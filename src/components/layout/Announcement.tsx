
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white py-2 px-4 text-center text-sm relative animate-fade-in">
      <p className="font-light">
        Sign up and get 20% off to your first order.{" "}
        <Link to="/signup" className="underline font-medium hover:opacity-80 transition-opacity">
          Sign Up Now
        </Link>
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Announcement;
