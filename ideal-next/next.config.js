/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // 開発環境でのみCSPを緩める（DevToolsのコンソールフィルター有効化のため）
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://ideal.microcms.io;"
            }
          ]
        }
      ];
    }
    return [];
  }
};

module.exports = nextConfig;
