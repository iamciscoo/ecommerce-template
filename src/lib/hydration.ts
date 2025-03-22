// Hydration utilities for client-side rendering

interface HydrationOptions {
  targetSelector: string;
  componentName: string;
  props?: Record<string, any>;
}

/**
 * Register a function to initialize a client component
 */
export function registerHydration(componentName: string, initFn: (props: any) => void) {
  if (typeof window !== 'undefined') {
    // Store initialization function in global registry
    window.__HYDRATION_REGISTRY = window.__HYDRATION_REGISTRY || {};
    window.__HYDRATION_REGISTRY[componentName] = initFn;
  }
}

/**
 * Find all hydration containers and initialize their components
 */
export function initializeHydration() {
  if (typeof window !== 'undefined') {
    // Find all elements with data-hydration-component attribute
    const containers = document.querySelectorAll('[data-hydration-component]');
    
    containers.forEach(container => {
      const componentName = container.getAttribute('data-hydration-component');
      if (!componentName) return;
      
      // Get all data attributes as props
      const props: Record<string, any> = {};
      Array.from(container.attributes)
        .filter(attr => attr.name.startsWith('data-') && attr.name !== 'data-hydration-component')
        .forEach(attr => {
          const key = attr.name.replace('data-', '');
          let value = attr.value;
          
          // Try to parse JSON if it looks like JSON
          if (value && (value.startsWith('{') || value.startsWith('[') || value === 'true' || value === 'false' || !isNaN(Number(value)))) {
            try {
              value = JSON.parse(value);
            } catch (e) {
              // Keep as string if not valid JSON
            }
          }
          
          props[key] = value;
        });
      
      // Get parent container
      const parentId = container.id.replace('-hydration-container', '');
      const parent = document.getElementById(parentId);
      
      if (parent) {
        // Call the initialization function if registered
        if (window.__HYDRATION_REGISTRY && window.__HYDRATION_REGISTRY[componentName]) {
          window.__HYDRATION_REGISTRY[componentName](props);
        } else {
          console.warn(`Hydration component "${componentName}" not registered`);
        }
      }
    });
  }
}

// Set up global type for TypeScript
declare global {
  interface Window {
    __HYDRATION_REGISTRY?: Record<string, (props: any) => void>;
  }
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initializeHydration();
  } else {
    window.addEventListener('load', initializeHydration);
  }
} 