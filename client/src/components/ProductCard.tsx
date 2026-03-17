import { ShoppingCart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import ProductTags from "./ProductTags";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

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

  return (
    <div className="product-card flex flex-col group">
      {/* Image Placeholder */}
      <a href={`/producto/${product.id}`} className="block">
        <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden group-hover:bg-muted transition-colors duration-300">
          {product.isPromo && (
            <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
              PROMO
            </div>
          )}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              <div className="text-4xl mb-2">🫒</div>
              <p className="text-sm">{product.brand}</p>
            </div>
          )}
        </div>
      </a>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <a href={`/producto/${product.id}`} className="block group/link mb-1">
          <h3 className="text-lg font-bold text-foreground group-hover/link:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </a>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description}
        </p>
        <p className="text-xs text-muted-foreground mb-3">{product.size}</p>

        {/* Product Tags */}
        <div className="mb-4 pb-4 border-b border-border">
          <ProductTags
            intensity={product.intensity}
            tasting={product.tasting}
            varieties={product.oliveVarieties}
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toLocaleString("es-AR")}
          </p>
          <p className="text-xs text-muted-foreground">ARS</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="text-xs text-muted-foreground font-semibold mb-2 block">
            Cantidad
          </label>
          <select
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {product.hasCart ? (
            <button
              onClick={handleAddToCart}
              className="flex-1 button-primary flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity duration-300"
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar
            </button>
          ) : (
            <button
              onClick={handleAddToWhatsApp}
              className="flex-1 button-secondary flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
