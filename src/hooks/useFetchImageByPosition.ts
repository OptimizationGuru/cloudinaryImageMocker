import { useState, useEffect } from 'react';
import {
  initializeData,
  loadData,
  loadDataFromLocal,
} from '../utils/localStorageUtils';
import { ThumbnailData } from './useFetchThumbnails';
import { newthumbnailImages } from '../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../store/thumbnails';

const useFetchImages = ({
  position,
  searchKey,
}: {
  position: number;
  searchKey: string;
}) => {
  const [images, setImages] = useState<ThumbnailData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { thumbnails } = useSelector((state: RootState) => state.thumbnail);

  interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }

  const fetchImagesbyPositionApi = (): Promise<
    ApiResponse<ThumbnailData[]>
  > => {
    initializeData(newthumbnailImages, thumbnails);
    return new Promise((resolve, reject) => {
      let data: any;
      setTimeout(() => {
        try {
          if (searchKey === newthumbnailImages) {
            data = loadDataFromLocal(searchKey);
          } else {
            data = loadData(searchKey);
          }

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
