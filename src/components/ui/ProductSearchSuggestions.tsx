
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

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-background border border-border rounded-md shadow-lg max-h-80 overflow-auto animate-fade-in">
      <div className="p-2 border-b border-border">
        <p className="text-xs text-muted-foreground">Products ({products.length})</p>
      </div>
      {products.map((product) => (
        <button
          key={product.id}
          className="w-full text-left p-3 hover:bg-secondary border-b border-border last:border-0 flex items-center group"
          onClick={() => {
            navigate(`/product/${product.id}`);
            onSelect(product.name);
          }}
        >
          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-muted">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
            />
          </div>
          <div className="ml-3 flex-grow">
            <div className="font-medium line-clamp-1">{product.name}</div>
            <div className="text-sm text-muted-foreground">${product.price}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {product.dressStyle.join(", ")}
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full ml-2">
            View
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProductSearchSuggestions;
