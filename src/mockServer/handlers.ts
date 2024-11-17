import { http } from 'msw';
import data from '../data/fullImages.json';
import { loadData, initializeData } from '../utils/localStorageUtils';

// Initialize localStorage with initial data
initializeData(data);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  http.get('/api/image', async (req) => {
    const url = req.request.url;

    const { searchParams } = new URL(url);

    const positionParam = searchParams.get('position');
    let data = loadData();

    if (positionParam) {
      const position = Number(positionParam);

      data = data.filter((item) => item.position === position);
    }
    await delay(500);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  }),
];
