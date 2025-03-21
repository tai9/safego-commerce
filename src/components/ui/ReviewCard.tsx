
import { Star, MoreHorizontal } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, date, comment, verified }) => {
  return (
    <div className="p-4 border-b last:border-b-0">
      {/* Rating and options */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {/* Author and date */}
      <div className="flex items-center mb-3">
        <h4 className="font-medium mr-2">{name}</h4>
        {verified && (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs">Verified</span>
          </span>
        )}
      </div>
      
      {/* Review content */}
      <p className="text-gray-700 mb-3">
        "{comment}"
      </p>
      
      {/* Posted date */}
      <p className="text-sm text-gray-500">
        Posted on {date}
      </p>
    </div>
  );
};

export default ReviewCard;
