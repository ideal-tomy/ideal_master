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

  const { endpoint } = req.query;
  
  if (!endpoint || Array.isArray(endpoint)) {
    return res.status(400).json({ error: 'エンドポイントが指定されていないか、無効です' });
  }

  try {
    const client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
      apiKey: process.env.MICROCMS_API_KEY || '',
    });

    // クエリパラメータの取得（queryとして渡されたものを除外）
    const { endpoint: _, ...queryParams } = req.query;
    
    // MicroCMSへのリクエスト
    const data = await client.get({
      endpoint,
      queries: queryParams,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 