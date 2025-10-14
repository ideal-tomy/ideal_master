import { client } from '@/lib/microcms';
import { MicroCMSResponse, Blog } from '@/types';
import BlogClientPage from './BlogClientPage';

// microCMSからブログ記事を取得する関数
async function getBlogs() {
  try {
    const blogs = await client.get<MicroCMSResponse<Blog>>({ 
      endpoint: 'blog', // エンドポイント名を'blogs'から'blog'に修正（一般的）
      queries: { orders: '-publishedAt' } // 新しい順に並び替え
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  }
}

// ブログページの本体（サーバーコンポーネント）
export default async function BlogPage() {
  // サーバーサイドでデータを取得
  const blogs = await getBlogs();

  // 取得したデータをクライアントコンポーネントに渡してレンダリング
  return <BlogClientPage blogs={blogs.contents} />;
}
