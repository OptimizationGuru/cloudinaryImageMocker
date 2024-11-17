import { useState, useEffect } from 'react';
import { loadData, saveData } from '../utils/localStorageUtils';
import { newthumbnailImages } from '../constants';

export type ThumbnailData = {
  type: string;
  title: string;
  position: number;
  publicId: string;
};

const useFetchNewlyAddedThumbnails = () => {
  const [images, setImages] = useState<ThumbnailData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newThumbnails, setNewThumbnails] = useState<ThumbnailData[]>([]); // State to track new thumbnails

  interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }

  const getNewlyAddedImagesApi = (): Promise<ApiResponse<ThumbnailData[]>> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = loadData(newthumbnailImages);
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

  const addNewThumbnails = (newThumbnails: ThumbnailData[]) => {
    setLoading(true);
    setError(null);
    try {
      const currentImages = loadData(newthumbnailImages);

      const updatedImages = [...currentImages, ...newThumbnails];

      saveData(newthumbnailImages, updatedImages);

      setNewThumbnails(newThumbnails);

      setImages(updatedImages);
    } catch (err: any) {
      setError('Error adding new thumbnails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchThumbnails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getNewlyAddedImagesApi();
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

  return {
    images,
    loading,
    error,
    newThumbnails,
    addNewThumbnails, // Expose the function to add new thumbnails
  };
};

export default useFetchNewlyAddedThumbnails;
