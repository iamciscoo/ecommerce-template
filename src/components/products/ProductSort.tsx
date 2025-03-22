"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = {
  label: string;
  value: string;
};

interface ProductSortProps {
  defaultValue?: string;
  onSortChange: (value: string) => void;
}

const sortOptions: SortOption[] = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Popularity", value: "popularity" },
  { label: "Rating: High to Low", value: "rating" },
];

export function ProductSort({ defaultValue = "latest", onSortChange }: ProductSortProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    // Update value if defaultValue changes (e.g., from URL params)
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onSortChange(newValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Sort by:</span>
      <Select
        value={value}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 