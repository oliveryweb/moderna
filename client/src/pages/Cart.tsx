import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity)) {
      updateQuantity(productId, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/20">
        <div className="container py-4">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </a>
        </div>
      </div>

      {/* Cart Content */}
      <div className="py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Mi Carrito
            </h1>
            <p className="text-muted-foreground">
              {items.length} producto{items.length !== 1 ? "s" : ""} en tu
              carrito
            </p>
          </div>

          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div
                    key={item.productId}
                    className="bg-card rounded-lg p-6 border border-border flex gap-6"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-center text-muted-foreground">
                        <div className="text-2xl">🫒</div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                        {item.productBrand}
                      </p>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.size}
                      </p>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-foreground">
                            Cantidad:
                          </label>
                          <select
                            value={item.quantity}
                            onChange={e =>
                              handleQuantityChange(
                                item.productId,
                                e.target.value
                              )
                            }
                            className="px-3 py-1 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">
                            Unitario: ${item.price.toLocaleString("es-AR")}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            $
                            {(item.price * item.quantity).toLocaleString(
                              "es-AR"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors duration-300 flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-8 border border-border sticky top-24">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Resumen del Pedido
                  </h3>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                    <span className="text-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                    <span className="text-foreground">Envío</span>
                    <span className="font-semibold text-secondary">
                      Consultar
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
                    <span className="text-lg font-bold text-foreground">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <a
                      href="/checkout"
                      className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-center block"
                    >
                      Finalizar Compra
                    </a>
                    <button
                      onClick={clearCart}
                      className="w-full px-4 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-300"
                    >
                      Vaciar Carrito
                    </button>
                  </div>

                  {/* Info */}
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Completa tu compra directamente con nuestro equipo por
                    WhatsApp
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-muted-foreground mb-8">
                Descubre nuestros deliciosos aceites de oliva premium
              </p>
              <a
                href="/#productos"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Explorar Productos
              </a>
            </div>
          )}
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
                    +54 351 240 2359
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
