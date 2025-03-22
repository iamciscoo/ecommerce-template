"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initializeHydration } from "@/lib/hydration";

export function HydrationScript() {
  useEffect(() => {
    // Initialize hydration when component mounts
    initializeHydration();
  }, []);

  return (
    <Script
      id="hydration-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Initialize hydration when DOM is ready
          if (document.readyState === 'complete') {
            initializeHydration();
          } else {
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(function() {
                // Find all hydration containers
                const containers = document.querySelectorAll('[data-hydration-component]');
                
                containers.forEach(container => {
                  const componentName = container.getAttribute('data-hydration-component');
                  if (!componentName) return;
                  
                  // Load the component dynamically
                  import('/components/' + componentName)
                    .then(module => {
                      if (module && typeof module.default === 'function') {
                        // Get the parent container
                        const parentId = container.id.replace('-hydration-container', '');
                        const parent = document.getElementById(parentId);
                        
                        if (parent) {
                          // Get props from data attributes
                          const props = {};
                          Array.from(container.attributes)
                            .filter(attr => attr.name.startsWith('data-') && attr.name !== 'data-hydration-component')
                            .forEach(attr => {
                              const key = attr.name.replace('data-', '');
                              let value = attr.value;
                              
                              // Try to parse JSON values
                              try {
                                value = JSON.parse(value);
                              } catch (e) {
                                // Keep as string if not valid JSON
                              }
                              
                              props[key] = value;
                            });
                            
                          // Initialize the component
                          console.log('Hydrating', componentName, 'with props:', props);
                        }
                      }
                    })
                    .catch(err => {
                      console.error('Error loading component:', componentName, err);
                    });
                });
              }, 0);
            });
          }
        `
      }}
    />
  );
} 