"use client";

import { createContext, useContext, ReactNode, Suspense } from "react";
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

// Separate component to wrap the actual hook usage
function SearchParamsReader({ children }: { children: (params: URLSearchParams) => ReactNode }) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}

export function SearchParamsProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading search parameters...</div>}>
      <SearchParamsReader>
        {(params) => (
          <SearchParamsContext.Provider value={{ params }}>
            {children}
          </SearchParamsContext.Provider>
        )}
      </SearchParamsReader>
    </Suspense>
  );
} 