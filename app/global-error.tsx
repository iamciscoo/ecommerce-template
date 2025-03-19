"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
          <button
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
} 