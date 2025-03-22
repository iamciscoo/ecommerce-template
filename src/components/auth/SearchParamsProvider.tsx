"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Create a context for search params
type SearchParamsContextType = {
  params: Record<string, string>;
};

const SearchParamsContext = createContext<SearchParamsContextType>({
  params: {},
});

export function useSearchParamsContext() {
  return useContext(SearchParamsContext);
}

export function SearchParamsProvider({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const newParams: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      newParams[key] = value;
    });
    setParams(newParams);
  }, [searchParams]);

  return (
    <SearchParamsContext.Provider value={{ params }}>
      {children}
    </SearchParamsContext.Provider>
  );
} 