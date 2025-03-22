"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState, Suspense } from "react";

// Separate component to wrap the useSearchParams hook
function SearchParamsReader({ children }: { children: (searchParamsString: string) => ReactNode }) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || "";
  return <>{children(searchParamsString)}</>;
}

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={<div>Loading page transition...</div>}>
      <SearchParamsReader>
        {(searchParamsString) => {
          const routeKey = `${pathname}?${searchParamsString}`;
          
          return (
            <AnimatePresence mode="wait">
              <motion.div
                key={routeKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          );
        }}
      </SearchParamsReader>
    </Suspense>
  );
} 