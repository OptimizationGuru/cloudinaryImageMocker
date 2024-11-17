import { ThumbnailData } from '../hooks/useFetchThumbnails';

// Type definition for data entries
export interface DataEntry {
  type: string;
  title: string;
  position: number;
  publicId: string;
}

export const LOCAL_STORAGE_KEY = 'mockData';

export function saveData(key: string, data: ThumbnailData[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key: string): ThumbnailData[] {
  const data = localStorage.getItem(key);

  return data ? (JSON.parse(data) as ThumbnailData[]) : [];
}

// Initialize localStorage with default data if empty
export function initializeData(
  key: string,
  initialData: ThumbnailData[]
): void {
  if (!localStorage.getItem(key)) {
    saveData(key, initialData);
  }
}
