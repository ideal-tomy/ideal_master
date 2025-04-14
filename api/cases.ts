import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'microcms-js-sdk';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = createClient({
      serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || '',
      apiKey: import.meta.env.VITE_MICROCMS_API_KEY || '',
    });

    // クエリパラメータの取得
    const { id } = req.query;
    
    if (id && !Array.isArray(id)) {
      // 特定のケース取得
      const data = await client.get({
        endpoint: 'cases',
        contentId: id,
      });
      return res.status(200).json(data);
    } else {
      // ケース一覧取得
      const data = await client.get({
        endpoint: 'cases',
        queries: req.query,
      });
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 