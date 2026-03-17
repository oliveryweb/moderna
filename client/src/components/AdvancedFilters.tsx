import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { intensityOptions, oliveVarieties } from "@/lib/products";

interface AdvancedFiltersProps {
  selectedIntensity: string[];
  selectedVarieties: string[];
  onIntensityChange: (intensity: string[]) => void;
  onVarietiesChange: (varieties: string[]) => void;
  onReset: () => void;
}

export default function AdvancedFilters({
  selectedIntensity,
  selectedVarieties,
  onIntensityChange,
  onVarietiesChange,
  onReset,
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIntensity = (value: string) => {
    if (selectedIntensity.includes(value)) {
      onIntensityChange(selectedIntensity.filter((i) => i !== value));
    } else {
      onIntensityChange([...selectedIntensity, value]);
    }
  };

  const toggleVariety = (value: string) => {
    if (selectedVarieties.includes(value)) {
      onVarietiesChange(selectedVarieties.filter((v) => v !== value));
    } else {
      onVarietiesChange([...selectedVarieties, value]);
    }
  };

  const totalFilters = selectedIntensity.length + selectedVarieties.length;

  return (
    <div className="w-full">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto flex items-center justify-between md:justify-start gap-3 px-4 py-3 border border-border rounded-lg bg-card text-foreground hover:bg-muted transition-colors duration-300"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros Avanzados</span>
          {totalFilters > 0 && (
            <span className="bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalFilters}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Filters Panel */}
      {isOpen && (
        <div className="mt-4 p-6 border border-border rounded-lg bg-card shadow-sm">
          {/* Intensity Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              Intensidad de Sabor
            </h3>
            <div className="space-y-3">
              {intensityOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedIntensity.includes(option.value)}
                    onChange={() => toggleIntensity(option.value)}
                    className="w-4 h-4 mt-1 rounded border-border cursor-pointer accent-primary"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {option.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Varieties Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
              Tipo de Aceituna
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {oliveVarieties.map((variety) => (
                <label
                  key={variety.value}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedVarieties.includes(variety.value)}
                    onChange={() => toggleVariety(variety.value)}
                    className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
                  />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {variety.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {totalFilters > 0 && (
              <button
                onClick={onReset}
                className="flex-1 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Limpiar Filtros
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {totalFilters > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedIntensity.map((intensity) => (
            <div
              key={intensity}
              className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
            >
              <span className="capitalize">
                {intensityOptions.find((o) => o.value === intensity)?.label}
              </span>
              <button
                onClick={() => toggleIntensity(intensity)}
                className="hover:text-primary/70 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {selectedVarieties.map((variety) => (
            <div
              key={variety}
              className="flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-sm text-secondary"
            >
              <span className="capitalize">
                {oliveVarieties.find((o) => o.value === variety)?.label}
              </span>
              <button
                onClick={() => toggleVariety(variety)}
                className="hover:text-secondary/70 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
