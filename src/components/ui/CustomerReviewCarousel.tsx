
import { useIsMobile } from "@/hooks/use-mobile";
import { reviewsData } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const CustomerReviewCarousel = () => {
  const isMobile = useIsMobile();
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ));
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviewsData.slice(0, 3).map((review) => (
          <Card key={review.id} className="bg-background border border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    {renderStars(review.rating)}
                    {review.verified && (
                      <span className="ml-2 text-xs bg-secondary px-1.5 py-0.5 rounded">Verified</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {reviewsData.map((review) => (
          <CarouselItem key={review.id} className="basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="bg-background border border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <span className="ml-2 text-xs bg-secondary px-1.5 py-0.5 rounded">Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="static translate-y-0 mx-2" />
        <CarouselNext className="static translate-y-0 mx-2" />
      </div>
    </Carousel>
  );
};

export default CustomerReviewCarousel;
