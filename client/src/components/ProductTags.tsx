import { intensityOptions } from "@/lib/products";

interface ProductTagsProps {
  intensity?: string;
  tasting?: string[];
  varieties?: string[];
}

export default function ProductTags({
  intensity,
  tasting,
  varieties,
}: ProductTagsProps) {
  const intensityLabel = intensityOptions.find(
    (o) => o.value === intensity
  )?.label;

  return (
    <div className="space-y-3">
      {/* Intensity Badge */}
      {intensity && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Intensidad
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              intensity === "suave"
                ? "bg-blue-100 text-blue-700"
                : intensity === "medio"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {intensityLabel}
          </span>
        </div>
      )}

      {/* Tasting Notes */}
      {tasting && tasting.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Notas de Sabor
          </p>
          <div className="flex flex-wrap gap-2">
            {tasting.map((note) => (
              <span
                key={note}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md capitalize"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Varieties */}
      {varieties && varieties.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Variedad
          </p>
          <div className="flex flex-wrap gap-2">
            {varieties.map((variety) => (
              <span
                key={variety}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md capitalize font-medium"
              >
                {variety}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
