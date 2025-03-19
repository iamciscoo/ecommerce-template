/**
 * Utility functions for fetching images from the Pexels API
 */

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
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
  liked: boolean;
  alt: string;
};

type PexelsResponse = {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page: string;
  prev_page: string;
};

/**
 * Fetch images from the Pexels API
 * @param query - Search term for images
 * @param perPage - Number of images to fetch per page (default: 10)
 * @param page - Page number to fetch (default: 1)
 * @returns Array of image objects or empty array on error
 */
export async function getPexelsImages(
  query: string,
  perPage: number = 10,
  page: number = 1
): Promise<PexelsPhoto[]> {
  // Ensure we have an API key
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  
  if (!apiKey) {
    console.error('Missing Pexels API key in environment variables');
    return [];
  }

  try {
    // Create URL with query parameters
    const url = new URL('https://api.pexels.com/v1/search');
    url.searchParams.append('query', query);
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('page', page.toString());
    
    // Fetch images from Pexels API
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': apiKey,
      },
      // Setting cache to force-cache to optimize for repeated requests
      cache: 'force-cache',
      // Revalidate every hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Pexels API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json() as PexelsResponse;
    return data.photos;
    
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
} 