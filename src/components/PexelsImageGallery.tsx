"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPexelsImages } from "@/lib/pexels";

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
};

type PexelsImageGalleryProps = {
  query: string;
  perPage?: number;
};

export default function PexelsImageGallery({ query, perPage = 6 }: PexelsImageGalleryProps) {
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        const fetchedImages = await getPexelsImages(query, perPage);
        setImages(fetchedImages);
        setError(null);
      } catch (err) {
        setError("Failed to load images. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [query, perPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array(perPage).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="aspect-square bg-gray-200 animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (images.length === 0) {
    return <div>No images found for &quot;{query}&quot;</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={image.src.medium}
            alt={image.alt || `Image related to ${query}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
            Photo by {image.photographer}
          </div>
        </div>
      ))}
    </div>
  );
} 