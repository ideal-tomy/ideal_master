export const fetchAICapabilities = async () => {
  try {
    // 環境変数が読み込めない場合のフォールバック
    const API_URL = import.meta.env.VITE_MICROCMS_API_URL || "https://ideal.microcms.io";
    const API_KEY = import.meta.env.VITE_MICROCMS_API_KEY;

    console.log('API URL:', API_URL);
    console.log('API Key:', API_KEY?.substring(0, 5) + '...');

    // エンドポイントを修正
    const url = `${API_URL}/api/v1/capabilities`;
    
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': API_KEY,
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // データの詳細を確認
    console.log('Full response data:', JSON.stringify(data, null, 2));
    console.log('Categories:', data.contents.map(c => ({
      category: c.category,
      categoryLength: c.category.length,
      // 文字コードも確認
      charCodes: Array.from(c.category).map((char: string) => char.charCodeAt(0))
    })));

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}; 