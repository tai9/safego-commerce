
import { useState } from "react";
import { Star, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ReviewCard from "@/components/ui/ReviewCard";

interface Rating {
  stars: number;
  count: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  customerImage?: string;
}

interface ProductReviewsProps {
  overallRating: number;
  totalReviews: number;
  ratings: Rating[];
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ 
  overallRating, 
  totalReviews, 
  ratings, 
  reviews 
}) => {
  const [currentFilter, setCurrentFilter] = useState<number | null>(null);
  
  const filteredReviews = currentFilter 
    ? reviews.filter(review => review.rating === currentFilter) 
    : reviews;
  
  // Convert ratings to percentages for progress bars
  const calculatePercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };
  
  return (
    <div className="space-y-10">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 flex flex-col items-center justify-center space-y-4">
          <div className="text-5xl font-bold">{overallRating.toFixed(1)}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < Math.floor(overallRating) ? "text-yellow-400 fill-yellow-400" : 
                  i < overallRating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300 dark:text-gray-600"}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Based on {totalReviews} reviews
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-3">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-2">
              <div className="flex items-center min-w-20">
                <button 
                  onClick={() => setCurrentFilter(currentFilter === rating.stars ? null : rating.stars)} 
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                    currentFilter === rating.stars ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <span>{rating.stars}</span>
                  <Star size={14} className="fill-current" />
                </button>
              </div>
              <Progress value={calculatePercentage(rating.count)} className="h-2 flex-grow" />
              <span className="text-sm min-w-14 text-right">{rating.count} reviews</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Filter indicator */}
      {currentFilter && (
        <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
          <div className="text-sm">
            Showing {filteredReviews.length} reviews with {currentFilter} stars
          </div>
          <button 
            onClick={() => setCurrentFilter(null)}
            className="text-sm text-primary hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No reviews match your filter
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
