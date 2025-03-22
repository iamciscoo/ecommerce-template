"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Attribute {
  id: string;
  name: string;
  values: {
    id: string;
    name: string;
    count: number;
  }[];
}

export interface ProductFilterProps {
  categories: Category[];
  attributes: Attribute[];
  initialFilters?: {
    categories?: string[];
    priceRange?: [number, number];
    attributes?: Record<string, string[]>;
  };
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    attributes: Record<string, string[]>;
  }) => void;
}

export function ProductFilter({
  categories,
  attributes,
  initialFilters,
  minPrice,
  maxPrice,
  onFilterChange,
}: ProductFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [minPrice, maxPrice]
  );
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string[]>
  >(initialFilters?.attributes || {});

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    
    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories, priceRange, selectedAttributes);
  };

  const handlePriceChange = (values: number[]) => {
    const newPriceRange: [number, number] = [values[0], values[1]];
    setPriceRange(newPriceRange);
    applyFilters(selectedCategories, newPriceRange, selectedAttributes);
  };

  const handleAttributeChange = (
    attributeId: string,
    valueId: string,
    checked: boolean
  ) => {
    const currentValues = selectedAttributes[attributeId] || [];
    const updatedValues = checked
      ? [...currentValues, valueId]
      : currentValues.filter((id) => id !== valueId);

    const updatedAttributes = {
      ...selectedAttributes,
      [attributeId]: updatedValues,
    };

    // Remove empty arrays
    if (updatedValues.length === 0) {
      delete updatedAttributes[attributeId];
    }

    setSelectedAttributes(updatedAttributes);
    applyFilters(selectedCategories, priceRange, updatedAttributes);
  };

  const applyFilters = (
    categories: string[],
    price: [number, number],
    attrs: Record<string, string[]>
  ) => {
    onFilterChange({
      categories,
      priceRange: price,
      attributes: attrs,
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedAttributes({});
    applyFilters([], [minPrice, maxPrice], {});
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice ||
    Object.keys(selectedAttributes).length > 0;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-muted-foreground"
          >
            Clear all <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price"]} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked === true)
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between"
                  >
                    <span>{category.name}</span>
                    <span className="text-muted-foreground">({category.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                min={minPrice}
                max={maxPrice}
                step={1}
                onValueCommit={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">${priceRange[0]}</span>
                <span className="text-sm font-medium">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Product Attributes */}
        {attributes.map((attribute) => (
          <AccordionItem key={attribute.id} value={attribute.id}>
            <AccordionTrigger>{attribute.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {attribute.values.map((value) => (
                  <div key={value.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`attr-${attribute.id}-${value.id}`}
                      checked={
                        (selectedAttributes[attribute.id] || []).includes(
                          value.id
                        )
                      }
                      onCheckedChange={(checked) =>
                        handleAttributeChange(
                          attribute.id,
                          value.id,
                          checked === true
                        )
                      }
                    />
                    <label
                      htmlFor={`attr-${attribute.id}-${value.id}`}
                      className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between"
                    >
                      <span>{value.name}</span>
                      <span className="text-muted-foreground">({value.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 