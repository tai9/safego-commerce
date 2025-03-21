
import React from "react";
import { Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

interface ProductSearchSuggestionsProps {
  products: Product[];
  onSelect: (name: string) => void;
}

const ProductSearchSuggestions: React.FC<ProductSearchSuggestionsProps> = ({ 
  products,
  onSelect
}) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-background border border-border rounded-md shadow-lg max-h-80 overflow-auto">
      {products.map((product) => (
        <button
          key={product.id}
          className="w-full text-left p-3 hover:bg-secondary border-b border-border last:border-0 flex items-center"
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-12 h-12 object-cover rounded mr-3" 
          />
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-muted-foreground">${product.price}</div>
            <div className="text-xs text-muted-foreground">
              {product.dressStyle.join(", ")}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProductSearchSuggestions;
