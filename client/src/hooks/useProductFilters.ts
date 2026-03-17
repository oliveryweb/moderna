import { useState, useMemo } from "react";
import { products, type Product } from "@/lib/products";

export function useProductFilters() {
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([]);
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by intensity
      if (
        selectedIntensity.length > 0 &&
        product.intensity &&
        !selectedIntensity.includes(product.intensity)
      ) {
        return false;
      }

      // Filter by olive varieties
      if (selectedVarieties.length > 0 && product.oliveVarieties) {
        const hasMatchingVariety = product.oliveVarieties.some((variety) =>
          selectedVarieties.includes(variety)
        );
        if (!hasMatchingVariety) {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesTasting =
          product.tasting?.some((t) => t.toLowerCase().includes(query)) || false;

        if (!matchesBrand && !matchesName && !matchesDescription && !matchesTasting) {
          return false;
        }
      }

      return true;
    });
  }, [selectedIntensity, selectedVarieties, searchQuery]);

  const resetFilters = () => {
    setSelectedIntensity([]);
    setSelectedVarieties([]);
    setSearchQuery("");
  };

  return {
    filteredProducts,
    selectedIntensity,
    setSelectedIntensity,
    selectedVarieties,
    setSelectedVarieties,
    searchQuery,
    setSearchQuery,
    resetFilters,
    totalFilters: selectedIntensity.length + selectedVarieties.length,
  };
}
