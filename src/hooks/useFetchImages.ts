import { useState, useEffect } from 'react';

type ImageData = {
  type: string;
  title: string;
  position: number;
  publicId: string;
};

const useFetchImages = ({ position }: { position: number }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/image?position=${position}`);

        // Check if the response has the correct content type
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          setLoading(false);
          throw new Error(
            `Expected JSON but received: ${contentType || 'unknown format'}`
          );
        }

        const result = await response.json();

        if (response.ok) {
          setImages(result);
        } else {
          setError(`Failed to fetch images: ${response.statusText}`);
        }
      } catch (err: any) {
        console.error('Caught error:', err.message);
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
};

export default useFetchImages;
