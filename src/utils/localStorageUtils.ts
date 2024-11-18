import { ThumbnailData } from '../hooks/useFetchThumbnails';
import { ThumbnailState } from '../store/thumbnailSlice';

export interface DataEntry {
  type: string;
  title: string;
  position: number;
  publicId: string;
}

export function saveData(key: string, data: ThumbnailData[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key: string): ThumbnailData[] {
  const data = localStorage.getItem(key);

  return data ? (JSON.parse(data) as ThumbnailData[]) : [];
}

export function loadDataFromLocal(key: string): ThumbnailState | null {
  const data = localStorage.getItem(key);

  if (data) return JSON.parse(data) as ThumbnailState;
  return null;
}

export function initializeData(
  key: string,
  initialData: ThumbnailData[]
): void {
  if (!localStorage.getItem(key)) {
    saveData(key, initialData);
  }
}
