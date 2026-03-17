import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";
import {
  checkoutFormSchema,
  checkoutSteps,
  type CheckoutFormData,
} from "@/lib/checkout";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onBlur",
  });

  const paymentMethod = watch("paymentMethod");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Carrito Vacío
          </h1>
          <p className="text-muted-foreground mb-8">
            No hay productos en tu carrito. Vuelve al catálogo para agregar
            algunos.
          </p>
          <a
            href="/#productos"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Volver al Catálogo
          </a>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Construir mensaje de WhatsApp
      const itemsList = items
        .map(
          item =>
            `• ${item.productBrand} - ${item.productName} (${item.size}): ${item.quantity} x $${item.price.toLocaleString("es-AR")}`
        )
        .join("\n");

      const message = `🫒 *NUEVO PEDIDO - OLIVERY* 🫒

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *DATOS DEL CLIENTE*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre: ${data.firstName} ${data.lastName}
📧 Email: ${data.email}
📞 Teléfono: ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *DIRECCIÓN DE ENVÍO*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 Calle: ${data.street} ${data.streetNumber}${data.apartment ? `, Piso/Depto: ${data.apartment}` : ""}
🏙️ Ciudad: ${data.city}
📌 Provincia: ${data.province}
📬 CP: ${data.postalCode}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 *PRODUCTOS DEL PEDIDO*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${itemsList}
📦 Total de items: ${items.reduce((sum, item) => sum + item.quantity, 0)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *RESUMEN DEL PEDIDO*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 Subtotal: $${total.toLocaleString("es-AR")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 *Método de Pago*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.paymentMethod === "transfer" ? "🏦 Transferencia Bancaria" : data.paymentMethod === "domicilio" ? "💵 Pago en Domicilio (contra entrega)" : "📱 Mercado Pago (olivery.cba)"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 *Notas Adicionales*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.notes ? data.notes : "Sin notas adicionales"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ Por favor confirmar disponibilidad y costo de envío.
🫒 ¡Gracias por tu compra!`;

      const whatsappUrl = `https://wa.me/3512402359?text=${encodeURIComponent(message)}`;

      // Intentamos abrir WhatsApp
      try {
        window.open(whatsappUrl, "_blank");
      } catch (e) {
        // Si falla, redirigimos directamente
        window.location.href = whatsappUrl;
      }

      // Limpiar carrito y mostrar confirmación
      clearCart();
      toast.success("Pedido enviado a WhatsApp");

      // Redirigir después de 3 segundos para dar tiempo a abrir WhatsApp
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/20">
        <div className="container py-4">
          <a
            href="/carrito"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Carrito
          </a>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center md:text-left">
            Finalizar Compra
          </h1>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 max-w-full">
            {/* Main Form */}
            <div className="lg:col-span-2 order-2 lg:order-1 w-full">
              {/* Progress Steps */}
              <div className="mb-8 md:mb-12">
                <div className="flex justify-between mb-6 md:mb-8 gap-1 md:gap-2">
                  {checkoutSteps.map(step => (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center flex-1 ${
                        step.id < checkoutSteps.length ? "relative" : ""
                      }`}
                    >
                      <div
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 text-xs md:text-base ${
                          step.id <= currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.id < currentStep ? (
                          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-center text-foreground leading-tight">
                        {step.title}
                      </p>
                      {step.id < checkoutSteps.length && (
                        <div
                          className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${
                            step.id < currentStep ? "bg-primary" : "bg-muted"
                          }`}
                          style={{ width: "calc(100% - 20px)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 md:space-y-8"
              >
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 md:space-y-6 bg-card rounded-lg p-4 md:p-8 border border-border">
                    <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center md:text-left">
                      Datos Personales
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          placeholder="Juan"
                          {...register("firstName")}
                          className={`w-full px-3 md:px-4 py-2 text-sm border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.firstName
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          placeholder="Pérez"
                          {...register("lastName")}
                          className={`w-full px-3 md:px-4 py-2 text-sm border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.lastName
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="juan@example.com"
                        {...register("email")}
                        className={`w-full px-3 md:px-4 py-2 text-sm border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.email ? "border-destructive" : "border-border"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        placeholder="+54 351 763 7431"
                        {...register("phone")}
                        className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.phone ? "border-destructive" : "border-border"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {currentStep === 2 && (
                  <div className="space-y-4 md:space-y-6 bg-card rounded-lg p-4 md:p-8 border border-border">
                    <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center md:text-left">
                      Dirección de Envío
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Calle *
                        </label>
                        <input
                          type="text"
                          placeholder="Av. Hipólito Yrigoyen"
                          {...register("street")}
                          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.street
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        />
                        {errors.street && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.street.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          placeholder="1234"
                          {...register("streetNumber")}
                          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.streetNumber
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        />
                        {errors.streetNumber && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.streetNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Apartamento (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Apt. 5B"
                        {...register("apartment")}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          placeholder="Córdoba"
                          {...register("city")}
                          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.city ? "border-destructive" : "border-border"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Provincia *
                        </label>
                        <input
                          type="text"
                          placeholder="Córdoba"
                          {...register("province")}
                          className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.province
                              ? "border-destructive"
                              : "border-border"
                          }`}
                        />
                        {errors.province && (
                          <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.province.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        placeholder="5000"
                        {...register("postalCode")}
                        className={`w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.postalCode
                            ? "border-destructive"
                            : "border-border"
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Shipping and Payment */}
                {currentStep === 3 && (
                  <div className="space-y-4 md:space-y-6 bg-card rounded-lg p-4 md:p-8 border border-border">
                    <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center md:text-left">
                      Envío y Pago
                    </h2>{" "}
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-sm text-primary font-bold mb-2">
                        IMPORTANTE
                      </p>
                      <p className="text-sm text-foreground">
                        El pago de tu PRIMERA COMPRA debe efectuarse por
                        ADELANTADO para que podamos verificarte y registrarte
                        como cliente. A partir de la segunda compra podés hacer
                        tu encargo por este medio y seleccionar la opción "Pago
                        en Domicilio" si lo preferís.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-4">
                        Método de Pago *
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="radio"
                            value="transfer"
                            {...register("paymentMethod")}
                            className="w-4 h-4 accent-primary"
                          />
                          <div className="ml-3">
                            <p className="font-semibold text-foreground">
                              Transferencia Bancaria
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Datos bancarios se enviarán por WhatsApp
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="radio"
                            value="mercadopago"
                            {...register("paymentMethod")}
                            className="w-4 h-4 accent-primary"
                          />
                          <div className="ml-3">
                            <p className="font-semibold text-foreground">
                              Mercado Pago
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Transferir a olivery.cba
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="radio"
                            value="domicilio"
                            {...register("paymentMethod")}
                            className="w-4 h-4 accent-primary"
                          />
                          <div className="ml-3">
                            <p className="font-semibold text-foreground">
                              Pago en Domicilio
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Abonar al delivery en tu domicilio
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Notas Adicionales (Opcional)
                      </label>
                      <textarea
                        placeholder="Indicaciones especiales para tu pedido..."
                        {...register("notes")}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-4 md:space-y-6 bg-card rounded-lg p-4 md:p-8 border border-border">
                    <h2 className="text-lg md:text-2xl font-bold text-foreground mb-4 md:mb-6 text-center md:text-left">
                      Confirmar Pedido
                    </h2>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          Acepto los términos y condiciones
                        </p>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("agreeTerms")}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="ml-2 text-sm text-foreground">
                            He leído y acepto los términos y condiciones de
                            Olivery
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.agreeTerms.message}
                          </p>
                        )}
                      </div>

                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm text-foreground mb-2">
                          <strong>Importante:</strong> Tu pedido será enviado a
                          WhatsApp para confirmación final. Nuestro equipo se
                          pondrá en contacto contigo para confirmar
                          disponibilidad y detalles de envío.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="w-full md:w-auto px-3 md:px-6 py-2 md:py-3 border border-border text-foreground rounded-lg font-medium text-sm md:text-base hover:bg-muted transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed order-2 md:order-1"
                  >
                    Atrás
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full md:w-auto px-3 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm md:text-base hover:opacity-90 transition-opacity order-1 md:order-2"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-3 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm md:text-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed order-1 md:order-2"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Pedido"}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2 w-full">
              <div className="bg-card rounded-lg p-4 md:p-8 border border-border sticky top-24 md:sticky top-32">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center md:text-left">
                  Resumen del Pedido
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-48 md:max-h-96 overflow-y-auto">
                  {items.map(item => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {item.productName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.quantity} x $
                          {item.price.toLocaleString("es-AR")}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground flex-shrink-0">
                        ${(item.price * item.quantity).toLocaleString("es-AR")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border text-center md:text-left">
                  <div className="flex justify-between gap-2">
                    <span className="text-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-foreground">Envío</span>
                    <span className="text-secondary font-semibold">
                      A confirmar
                    </span>
                  </div>
                </div>

                <div className="flex justify-between gap-2 mb-6 text-center md:text-left">
                  <span className="text-base md:text-lg font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-primary">
                    ${total.toLocaleString("es-AR")}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  {items.length} producto{items.length !== 1 ? "s" : ""} en tu
                  pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
