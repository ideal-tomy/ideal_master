import axios from 'axios';
import { mockCases, mockCapabilities } from '../mockData';

// デバッグ情報の出力設定
const DEBUG = true;

// 開発環境と本番環境で異なるベースURLを使用
const baseURL = import.meta.env.DEV 
  ? 'http://localhost:3003/api' // 開発環境ではViteのプロキシを経由
  : '/api';

// 開発モードの設定
const USE_MOCK_DATA = true; // 本番環境ではfalseに変更する

// APIエラーの詳細をコンソールに出力
const logApiError = (error: any, endpoint: string) => {
  console.error(`API Error (${endpoint}):`, error);
  if (error.response) {
    // サーバーからのレスポンスがある場合
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    // リクエストは行われたがレスポンスがない場合
    console.error('No response received:', error.request);
  } else {
    // リクエスト作成時にエラーが発生した場合
    console.error('Request error:', error.message);
  }
  console.error('Full error config:', error.config);
};

// Axiosインスタンスの作成
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // タイムアウトを設定
  timeout: 10000,
});

// シミュレーションデータ（APIが利用できない場合のフォールバック）
const FALLBACK_DATA = {
  cases: mockCases,
  capabilities: { contents: mockCapabilities, totalCount: mockCapabilities.length, offset: 0, limit: 10 }
};

// デバッグ用にモックデータを表示
if (DEBUG) {
  console.log('Mock Capabilities Data:', mockCapabilities && mockCapabilities.length > 0 ? JSON.stringify(mockCapabilities[0], null, 2) : 'No mock capabilities data');
  console.log('Mock Cases Data:', mockCases && mockCases.contents && mockCases.contents.length > 0 ? JSON.stringify(mockCases.contents[0], null, 2) : 'No mock cases data');
}

// APIリクエストのラッパー関数
export const fetchFromAPI = async <T>(
  endpoint: string, 
  params: Record<string, any> = {}
): Promise<T> => {
  // 開発環境でモックデータを使用
  if (USE_MOCK_DATA) {
    console.log(`Using mock data for ${endpoint}`);
    const fallbackKey = endpoint.replace(/^\//, ''); // 先頭の/を削除
    if (fallbackKey in FALLBACK_DATA) {
      if (DEBUG) console.log(`Mock data for ${fallbackKey}:`, FALLBACK_DATA[fallbackKey as keyof typeof FALLBACK_DATA]);
      return FALLBACK_DATA[fallbackKey as keyof typeof FALLBACK_DATA] as T;
    }
  }

  try {
    console.log(`Fetching from ${endpoint} with params:`, params);
    const response = await apiClient.get<T>(endpoint, { params });
    console.log(`API Response from ${endpoint}:`, response.data);
    return response.data;
  } catch (error) {
    logApiError(error, endpoint);
    
    // フォールバックデータを返す
    const fallbackKey = endpoint.replace(/^\//, ''); // 先頭の/を削除
    if (fallbackKey in FALLBACK_DATA) {
      console.warn(`Using fallback data for ${endpoint}`);
      return FALLBACK_DATA[fallbackKey as keyof typeof FALLBACK_DATA] as T;
    }
    
    throw error;
  }
};

// 特定のエンドポイントに対するヘルパー関数
export const getCases = async (params = {}) => {
  if (DEBUG) console.log('getCases called with params:', params);
  const data = await fetchFromAPI('/cases', params);
  if (DEBUG) console.log('getCases result:', data);
  return data;
};

export const getCaseById = async (id: string) => {
  if (DEBUG) console.log('getCaseById called with id:', id);
  
  // モックデータモードの場合
  if (USE_MOCK_DATA) {
    const caseItem = mockCases.contents.find(item => item.id === id);
    if (caseItem) {
      if (DEBUG) console.log('Found case in mock data:', caseItem);
      return caseItem;
    }
    if (DEBUG) console.log('Case not found in mock data, using first item');
    return mockCases.contents[0];
  }

  // 特定のIDのケースを取得する場合
  if (id) {
    const data = await fetchFromAPI('/cases', { id });
    if (DEBUG) console.log('getCaseById result:', data);
    return data;
  }
  
  // フォールバック
  if (DEBUG) console.log('Using fallback case data');
  return FALLBACK_DATA.cases.contents[0];
};

export const getCapabilities = async (params = {}) => {
  if (DEBUG) console.log('getCapabilities called with params:', params);
  const data = await fetchFromAPI('/capabilities', params);
  if (DEBUG) console.log('getCapabilities result:', data);
  return data;
};

export const getCapabilityById = async (id: string) => {
  if (DEBUG) console.log('getCapabilityById called with id:', id);
  
  // モックデータモードの場合
  if (USE_MOCK_DATA) {
    const capability = mockCapabilities.find(item => item.id === id);
    if (capability) {
      if (DEBUG) console.log('Found capability in mock data:', capability);
      return capability;
    }
    if (DEBUG) console.log('Capability not found in mock data, using first item');
    return mockCapabilities[0];
  }

  // 特定のIDの機能を取得する場合
  if (id) {
    const data = await fetchFromAPI('/capabilities', { id });
    if (DEBUG) console.log('getCapabilityById result:', data);
    return data;
  }
  
  // フォールバック
  if (DEBUG) console.log('Using fallback capability data');
  return mockCapabilities[0];
};

// 汎用APIリクエスト関数
export const getContentFromAPI = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> => {
  if (DEBUG) console.log('getContentFromAPI called with endpoint:', endpoint, 'params:', params);
  const data = await fetchFromAPI<T>(`/${endpoint}`, params);
  if (DEBUG) console.log('getContentFromAPI result:', data);
  return data;
}; 