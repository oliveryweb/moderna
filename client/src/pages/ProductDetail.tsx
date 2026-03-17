import { useState } from "react";
import { useRoute } from "wouter";
import { ShoppingCart, MessageCircle, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ProductGallery from "@/components/ProductGallery";
import TastingNotes from "@/components/TastingNotes";
import ProductInfo from "@/components/ProductInfo";
import ReviewsSection from "@/components/ReviewsSection";
import ProductTags from "@/components/ProductTags";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/products";
import { reviews, productDetails } from "@/lib/reviews";

export default function ProductDetail() {
  const [, params] = useRoute("/producto/:id");
  const productId = params?.id;

  const product = products.find(p => p.id === productId);
  const productReviews = reviews.filter(r => r.productId === productId);
  const details = productDetails[productId || ""];

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Producto no encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            Lo sentimos, el producto que buscas no existe.
          </p>
          <a
            href="/#productos"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Volver al catálogo
          </a>
        </div>
      </div>
    );
  }

  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length
      : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productBrand: product.brand,
      price: product.price,
      quantity: quantity,
      size: product.size,
    });
    toast.success(
      `${quantity} ${product.name} agregado${quantity > 1 ? "s" : ""} al carrito`
    );
    setQuantity(1);
  };

  const handleAddToWhatsApp = () => {
    const message = `Hola, me interesa el producto: ${product.brand} - ${product.name} (${product.size}) - Cantidad: ${quantity}`;
    const whatsappUrl = `https://wa.me/3512402359?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.brand} - ${product.name}`,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/20">
        <div className="container py-4">
          <a
            href="/#productos"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </a>
        </div>
      </div>

      {/* Product Detail */}
      <div className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Gallery */}
            <div>
              <ProductGallery
                productName={product.name}
                productBrand={product.brand}
                images={
                  product.image
                    ? [product.image, ...(details?.images || [])]
                    : details?.images
                }
              />
            </div>

            {/* Right: Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
                  {product.brand}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {product.description}
                </p>

                {/* Rating */}
                {productReviews.length > 0 && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= Math.round(averageRating)
                              ? "text-secondary"
                              : "text-muted-foreground"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {averageRating.toFixed(1)} ({productReviews.length} reseña
                      {productReviews.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <ProductTags
                  intensity={product.intensity}
                  tasting={product.tasting}
                  varieties={product.oliveVarieties}
                />
              </div>

              {/* Price and Size */}
              <div className="bg-muted/30 rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">Tamaño</p>
                <p className="text-lg font-semibold text-foreground mb-4">
                  {product.size}
                </p>
                <p className="text-sm text-muted-foreground mb-2">Precio</p>
                <p className="text-4xl font-bold text-primary mb-1">
                  ${product.price.toLocaleString("es-AR")}
                </p>
                <p className="text-sm text-muted-foreground">ARS</p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Cantidad
                </label>
                <select
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {product.hasCart ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 button-primary flex items-center justify-center gap-2 text-base py-3"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al Carrito
                  </button>
                ) : (
                  <button
                    onClick={handleAddToWhatsApp}
                    className="flex-1 button-secondary flex items-center justify-center gap-2 text-base py-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Consultar por WhatsApp
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors duration-300"
                >
                  <Share2 className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Tasting Notes */}
          {details && (
            <>
              <div className="mb-16">
                <TastingNotes
                  aroma={details.tastingNotes.aroma}
                  palate={details.tastingNotes.palate}
                  finish={details.tastingNotes.finish}
                />
              </div>

              {/* Divider */}
              <div className="section-divider"></div>

              {/* Product Info */}
              <div className="mb-16">
                <ProductInfo details={details} />
              </div>

              {/* Divider */}
              <div className="section-divider"></div>
            </>
          )}

          {/* Reviews */}
          <div className="mb-16">
            <ReviewsSection
              reviews={productReviews}
              averageRating={averageRating}
              totalReviews={productReviews.length}
            />
          </div>

          {/* Related Products */}
          <div className="section-divider"></div>
          <div className="py-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Productos Relacionados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(
                  p =>
                    p.id !== product.id &&
                    p.intensity === product.intensity &&
                    p.type === product.type
                )
                .slice(0, 4)
                .map(relatedProduct => (
                  <a
                    key={relatedProduct.id}
                    href={`/producto/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
                      <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <div className="text-3xl mb-1">🫒</div>
                          <p className="text-xs">{relatedProduct.brand}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                          {relatedProduct.brand}
                        </p>
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-sm text-primary font-bold">
                          ${relatedProduct.price.toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 mt-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Olivery</h3>
              <p className="text-background/80 text-sm leading-relaxed">
                Aceites de oliva virgen extra premium de Argentina,
                seleccionados con pasión y dedicación.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <a
                    href="/#productos"
                    className="hover:text-background transition-colors"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="/#nosotros"
                    className="hover:text-background transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="/#premios"
                    className="hover:text-background transition-colors"
                  >
                    Premios
                  </a>
                </li>
                <li>
                  <a
                    href="/#contacto"
                    className="hover:text-background transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <a
                    href="mailto:oliveryweb@gmail.com"
                    className="hover:text-background transition-colors"
                  >
                    oliveryweb@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/3512402359"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    +54 351 763 7431
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <p className="text-center text-sm text-background/60">
              © 2026 Olivery. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
