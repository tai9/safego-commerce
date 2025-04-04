
import { Star, MoreHorizontal } from "lucide-react";
import { Review } from "@/components/ui/product-reviews";

interface ReviewCardProps {
  name?: string;
  rating?: number;
  date?: string;
  comment?: string;
  verified?: boolean;
  review?: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, date, comment, verified, review }) => {
  // If a review object is provided, use its properties, otherwise use the individual props
  const displayName = review ? review.customerName : name;
  const displayRating = review ? review.rating : rating;
  const displayDate = review ? review.date : date;
  const displayComment = review ? review.comment : comment;
  const displayVerified = verified || false; // Default to false if not provided

  return (
    <div className="p-4 border-b last:border-b-0 dark:border-gray-700">
      {/* Rating and options */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < (displayRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
            />
          ))}
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Author and date */}
      <div className="flex items-center mb-3">
        <h4 className="font-medium mr-2 dark:text-gray-200">{displayName}</h4>
        {displayVerified && (
          <span className="inline-flex items-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-1.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs">Verified</span>
          </span>
        )}
      </div>
      
      {/* Review content */}
      <p className="text-gray-700 dark:text-gray-300 mb-3">
        "{displayComment}"
      </p>
      
      {/* Posted date */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Posted on {displayDate}
      </p>
    </div>
  );
};

export default ReviewCard;
