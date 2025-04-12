import { AICapabilityResponse, SingleAICapabilityResponse } from '../../types/capability';
import { getCapabilities as getServerCapabilities, getCapabilityById as getServerCapabilityById } from './serverlessClient';

export const getCapabilities = async () => {
  try {
    console.log('Fetching capabilities...');
    
    const response = await getServerCapabilities();
    
    console.log('Full API response:', JSON.stringify(response, null, 2));
    
    // MicroCMSのレスポンス形式かチェック
    if (response && typeof response === 'object' && 'contents' in response && Array.isArray(response.contents)) {
      console.log('Valid response with contents array, length:', response.contents.length);
      return response;
    }
    
    // 配列の場合はそのまま返す（モックデータからの場合）
    if (Array.isArray(response)) {
      console.log('Response is an array, length:', response.length);
      return {
        contents: response,
        totalCount: response.length,
        offset: 0,
        limit: 10
      };
    }

    // オブジェクトだがcontentsがない場合（異常）
    console.warn('Invalid response format:', response);
    throw new Error('Invalid API response format');
  } catch (error) {
    console.error('Error in getCapabilities:', error);
    throw error;
  }
};

export const getCapabilityById = async (id: string) => {
  try {
    const capability = await getServerCapabilityById(id);
    return capability;
  } catch (error) {
    console.error(`Error fetching capability with ID: ${id}`, error);
    throw error;
  }
};