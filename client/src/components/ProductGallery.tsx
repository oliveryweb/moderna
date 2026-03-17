import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  productName: string;
  productBrand: string;
  images?: string[];
}

export default function ProductGallery({
  productName,
  productBrand,
  images = [],
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use provided images or fallback to placeholder
  const galleryImages =
    images.length > 0
      ? images
      : [
          `https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80`,
          `https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80`,
        ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
        <img
          src={galleryImages[currentIndex]}
          alt={`${productBrand} ${productName}`}
          className="w-full h-full object-contain"
        />

        {/* Navigation Buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
