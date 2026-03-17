import { Star, CheckCircle } from "lucide-react";
import type { Review } from "@/lib/reviews";

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-secondary text-secondary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Opiniones de Clientes
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 mb-2">{renderStars(Math.round(averageRating))}</div>
            <p className="text-sm text-muted-foreground">
              Basado en {totalReviews} reseña{totalReviews !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-foreground">
                    {rating}
                  </span>
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-300"
                    style={{
                      width: `${totalReviews > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-lg p-6 border border-border hover:shadow-sm transition-shadow duration-300"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-foreground">{review.author}</h4>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Compra verificada
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    {renderStars(review.rating)}
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Title */}
              <h5 className="font-semibold text-foreground mb-2">
                {review.title}
              </h5>

              {/* Review Comment */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">
              Aún no hay reseñas para este producto. ¡Sé el primero en compartir tu opinión!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
