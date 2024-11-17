import { useState, useEffect } from 'react';
import { initializeData, loadData } from '../utils/localStorageUtils';
import { thumbnailImages } from '../constants';
import data from '../data/thumbnails.json';

export type ThumbnailData = {
  type: string;
  title: string;
  position: number;
  publicId: string;
};

const useFetchThumbnails = () => {
  initializeData(thumbnailImages, data);
  const [images, setImages] = useState<ThumbnailData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }

  const getImagesApi = (): Promise<ApiResponse<ThumbnailData[]>> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = loadData(thumbnailImages);

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
      }, 200);
    });
  };

  useEffect(() => {
    const fetchThumbnails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getImagesApi();
        setImages(response.data);
      } catch (err: any) {
        console.error('Caught error:', err.message);
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnails();
  }, []);

  return { images, loading, error };
};

export default useFetchThumbnails;
