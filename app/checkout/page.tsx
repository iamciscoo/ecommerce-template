// Add Edge runtime to avoid client-side hooks issues
export const runtime = 'edge';

function CheckoutSkeleton() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="space-y-10">
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-96 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

// This is now a static page
export default function CheckoutPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="space-y-10">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <noscript>
          <p>This page requires JavaScript to function properly.</p>
        </noscript>
        <div id="checkout-content">
          <CheckoutSkeleton />
          <div className="hidden" id="checkout-hydration-container" data-hydration-component="CheckoutClient" />
        </div>
      </div>
    </div>
  );
} 