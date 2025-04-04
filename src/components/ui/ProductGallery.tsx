
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name?: string; // Making name optional
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name = "Product" }) => {
  const [activeImage, setActiveImage] = useState(0);

  // Ensure we have unique images by creating a Set
  const uniqueImages = [...new Set(images)];

  const handlePrev = () => {
    setActiveImage((prev) => (prev === 0 ? uniqueImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImage((prev) => (prev === uniqueImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Thumbnails - Vertical on desktop, hidden on mobile */}
      <div className="hidden md:flex flex-col gap-3 order-1">
        {uniqueImages.map((image, index) => (
          <button
            key={index}
            className={`border rounded-md overflow-hidden aspect-square ${
              index === activeImage ? "ring-2 ring-black" : "hover:ring-1 hover:ring-gray-300"
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="md:col-span-4 relative aspect-square md:aspect-auto order-2">
        <div className="relative h-full">
          <img
            src={uniqueImages[activeImage]}
            alt={name}
            className="w-full h-full object-cover object-center rounded-md animate-fade-in"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Thumbnails - Horizontal on mobile only */}
      <div className="flex gap-2 overflow-x-auto md:hidden order-3 py-2">
        {uniqueImages.map((image, index) => (
          <button
            key={index}
            className={`border flex-shrink-0 rounded-md overflow-hidden w-16 aspect-square ${
              index === activeImage ? "ring-2 ring-black" : ""
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
