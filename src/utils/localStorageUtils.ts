// Type definition for data entries
export interface DataEntry {
  type: string;
  title: string;
  position: number;
  publicId: string;
}

export const LOCAL_STORAGE_KEY = 'mockData';

export function saveData(data: DataEntry[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): DataEntry[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Initialize localStorage with default data if empty
export function initializeData(initialData: DataEntry[]): void {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    saveData(initialData);
  }
}
