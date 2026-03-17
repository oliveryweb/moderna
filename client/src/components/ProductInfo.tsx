import { AlertCircle } from "lucide-react";
import type { ProductDetails } from "@/lib/reviews";

interface ProductInfoProps {
  details: ProductDetails;
}

export default function ProductInfo({ details }: ProductInfoProps) {
  return (
    <div className="space-y-8">
      {/* Full Description */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Descripción Completa
        </h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {details.fullDescription}
        </p>
      </div>

      {/* Origin and Characteristics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Origen
          </h4>
          <p className="text-lg text-secondary font-semibold">{details.origin}</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Cosecha
          </h4>
          <p className="text-lg text-secondary font-semibold">
            {details.harvest}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Acidez
          </h4>
          <p className="text-lg text-secondary font-semibold">{details.acidity}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Menor acidez = mayor calidad
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
            Polifenoles
          </h4>
          <p className="text-lg text-secondary font-semibold">
            {details.polyphenols}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Antioxidantes naturales
          </p>
        </div>
      </div>

      {/* Pairings */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Maridajes Sugeridos
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {details.pairings.map((pairing, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
            >
              <span className="text-secondary font-bold">✓</span>
              <span className="text-foreground font-medium">{pairing}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Instructions */}
      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-8">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-bold text-foreground mb-2">
              Instrucciones de Almacenamiento
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {details.storageInstructions}
            </p>
          </div>
        </div>
      </div>

      {/* Nutritional Information */}
      <div className="bg-card rounded-lg p-8 border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Información Nutricional
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Por 100 ml de producto
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-foreground font-medium">Calorías</span>
            <span className="text-lg font-bold text-primary">
              {details.nutritionalInfo.caloriesPer100ml} kcal
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-foreground font-medium">Grasas</span>
            <span className="text-lg font-bold text-primary">
              {details.nutritionalInfo.fat}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-foreground font-medium">Proteínas</span>
            <span className="text-lg font-bold text-primary">
              {details.nutritionalInfo.protein}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-foreground font-medium">Carbohidratos</span>
            <span className="text-lg font-bold text-primary">
              {details.nutritionalInfo.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
