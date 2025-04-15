import { AICapabilityResponse, SingleAICapabilityResponse } from '../../types/capability';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
});

export const getCapabilities = async () => {
  try {
    // APIから直接データを取得
    const data = await client.get({ endpoint: 'capabilities' });
    
    // デバッグ用にレスポンス全体を表示
    console.log('MicroCMS raw response:', data);
    
    // データの構造を検証
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response structure');
    }
    
    return data; // 修正：データをそのまま返す
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCapabilityById = async (id: string) => {
  try {
    if (!id) {
      throw new Error('ID is required');
    }
    
    const data = await client.get({
      endpoint: 'capabilities',
      contentId: id
    });
    
    console.log('Single capability data:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching capability ${id}:`, error);
    throw error;
  }
};