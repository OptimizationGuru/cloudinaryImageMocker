import { useState, useEffect } from 'react';
import { loadData } from '../utils/localStorageUtils';
import { fullImages } from '../constants';
import { ThumbnailData } from './useFetchThumbnails';

const useFetchImages = ({ position }: { position: number }) => {
  const [images, setImages] = useState<ThumbnailData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }

  const fetchImagesbyPositionApi = (): Promise<
    ApiResponse<ThumbnailData[]>
  > => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = loadData(fullImages);
          resolve({
            status: 200,
            message: 'Images retrieved successfully',
            data: data,
          });
        } catch (error) {
          reject({
            status: 500,
            message: 'Failed to retrieve images',
            data: [],
          });
        }
      }, 2000);
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchImagesbyPositionApi();
        setImages(response.data.filter((image) => image.position === position));
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
