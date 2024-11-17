import { useState } from 'react';

type ThumbnailData = {
  type: string;
  title: string;
  position: number;
  publicId: string;
};

const useAddThumbnail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addThumbnail = async (thumbnail: ThumbnailData[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/thumbnails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thumbnail),
      });

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(
          `Expected JSON but received: ${contentType || 'unknown format'}`
        );
      }

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(
          `Failed to add thumbnail: ${result.message || response.statusText}`
        );
      }
    } catch (err: any) {
      console.error('Caught error:', err.message);
      setError(err.message || 'Error adding data');
    } finally {
      setLoading(false);
    }
  };

  return { addThumbnail, loading, error, success };
};

export default useAddThumbnail;
