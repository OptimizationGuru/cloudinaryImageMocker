import { useState, useEffect } from 'react';
import { loadData, saveData } from '../utils/localStorageUtils';
import { newthumbnailImages } from '../constants';

export type ThumbnailData = {
  type: string;
  title: string;
  position: number;
  publicId: string;
};

const useAddNewThumbnails = (newThumbnails: ThumbnailData[]) => {
  const [images, setImages] = useState<ThumbnailData[]>([]);
  const [loading_, setLoading] = useState<boolean>(false);
  const [error_, setError] = useState<string | null>(null);

  interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }

  const pushNewThumbnailsApi = (
    newThumbnails: ThumbnailData[]
  ): Promise<ApiResponse<ThumbnailData[]>> => {
    console.log(newThumbnails, 'newThumbnails');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const existingData = loadData(newthumbnailImages);
          const updatedData = [...existingData, ...newThumbnails];

          saveData(newthumbnailImages, updatedData);

          const finalData = loadData(newthumbnailImages);
          resolve({
            status: 200,
            message: 'Images retrieved successfully',
            data: finalData,
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
    const addThumbnails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await pushNewThumbnailsApi(newThumbnails);
        setImages(response.data);
      } catch (err: any) {
        console.error('Caught error:', err.message);
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    addThumbnails();
  }, []);

  return { pushNewThumbnailsApi, loading_, error_ };
};

export default useAddNewThumbnails;
