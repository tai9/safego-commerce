
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden group">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          
          {product.discount && (
            <span className="absolute top-2 right-2 bg-discount text-white text-xs font-medium px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-base text-left mb-1">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : i < product.rating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating}/5
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center">
            <span className="font-semibold text-base mr-2">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
