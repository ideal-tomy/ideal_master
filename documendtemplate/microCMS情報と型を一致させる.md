# MicroCMSデータとTypeScript型の整合性を取る手順ガイド

外部API（特にMicroCMSのようなヘッドレスCMS）を利用する際、取得したデータをTypeScriptの型システムと正しく連携させることは、コードの安全性と保守性を高める上で非常に重要です。ここでは、その一般的な手順とデバッグのポイントを解説します。

## なぜ型定義との整合性が重要か？

- **早期エラー発見:** コンパイル時や開発中に型の不一致によるエラーを発見でき、ランタイムエラーを未然に防ぎます。
- **コード補完と可読性向上:** IDEによる正確なコード補完が効き、データ構造が明確になるためコードの可読性が向上します。
- **リファクタリングの安全性:** データ構造の変更があった場合に、影響範囲を特定しやすくなります。

## 手順

### 1. APIレスポンスの構造を正確に把握する

まず、MicroCMSから実際にどのようなデータが返ってくるのかを正確に知る必要があります。

- **ツール:**
    - **ブラウザのデベロッパーツール（Networkタブ）:** 最も手軽で直接的な方法。実際のAPIリクエストを選択し、「Response」または「Preview」タブでJSONデータを確認します。
    - **PostmanなどのAPIクライアントツール:** ヘッダー情報やパラメータを細かく設定してリクエストを送信し、レスポンスを確認できます。
    - **`curl` コマンド:** CUIで手早く確認したい場合に便利です。
- **確認ポイント:**
    - **MicroCMSの基本構造:**
        - リスト形式API ([getList](cci:1://file:///c:/Users/ryoji/00%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88/ideal/ideal_master/ideal-next/src/lib/microcms.ts:46:2-51:3)): `{"contents": [...], "totalCount": N, "offset": N, "limit": N}` という構造が基本です。
        - 詳細形式API ([get](cci:1://file:///c:/Users/ryoji/00%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88/ideal/ideal_master/ideal-next/src/lib/microcms.ts:13:2-45:3)): `contents` 配列がなく、オブジェクトが直接返されます。
    - **`contents` 配列内の各アイテム（オブジェクト）:**
        - **フィールド名:** APIスキーマで定義したフィールドIDがそのままキーになります。
        - **データ型:** 各フィールドが文字列、数値、真偽値、オブジェクト、配列のどれに該当するか。
        - **オプショナルなフィールド:** APIスキーマで必須にしていないフィールドは、データに含まれない場合があります。
        - **画像オブジェクト (`MicroCMSImage` 相当):** 通常 `{"url": "...", "height": N, "width": N}` という構造です。
        - **日付フィールド (`MicroCMSDate` 相当):** `createdAt`, `updatedAt`, `publishedAt`, `revisedAt` など、ISO 8601形式の文字列 (`YYYY-MM-DDTHH:mm:ss.SSSZ`) で返されます。
        - **リッチエディタ:** HTML文字列として返されます。
        - **繰り返しフィールド:** 配列として返され、各要素がその繰り返し単位のオブジェクトになります。
        - **関連コンテンツ:** 関連先のコンテンツの主要フィールド（通常は `id` とタイトルなど）がオブジェクトまたは配列として含まれることがあります。

### 2. TypeScriptで型を定義する

把握したデータ構造に基づいて、TypeScriptの型 (`interface` または `type`) を定義します。

- **基本の型付け:**
    - 文字列: `string`
    - 数値: `number`
    - 真偽値: `boolean`
    - オプショナルなプロパティ: `propertyName?: type;` （例: `description?: string;`）
    - `null` を許容する場合: `string | null`
- **MicroCMS特有の型（推奨される共通の型定義例）:**

  ```typescript
  // src/types/microcms.ts (例)

  export interface MicroCMSImage {
    url: string;
    height?: number; // API設定により含まれない場合もあるのでオプショナル推奨
    width?: number;  // 同上
  }

  export interface MicroCMSDate {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  }

  // リスト形式APIのレスポンス全体の型
  export interface MicroCMSListResponse<T> {
    contents: T[];
    totalCount: number;
    offset: number;
    limit: number;
  }

  // 個々のコンテンツに共通する基本型 (id と日付情報)
  // これを継承して各コンテンツの型を定義すると便利
  export interface MicroCMSListContent extends MicroCMSDate {
    id: string;
  }

  // オブジェクト形式APIのレスポンス全体の型 (日付情報のみ)
  export interface MicroCMSObjectContent extends MicroCMSDate {
    // id はパスパラメータで指定するため、レスポンスボディには通常含まれない
  }

  // src/types/index.ts (例)
import { MicroCMSImage, MicroCMSListContent, MicroCMSObjectContent } from './microcms';

export interface Category extends MicroCMSListContent { // カテゴリもMicroCMSで管理する場合
  name: string;
}

export interface Blog extends MicroCMSListContent { // リストアイテム用
  title: string;
  content: string; // リッチエディタのHTML
  eyecatch?: MicroCMSImage; // オプショナルな画像
  categories: Category[]; // 関連コンテンツ (複数選択可の場合)
}

export interface BlogDetail extends MicroCMSObjectContent { // 詳細ページ用 (idなし)
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  categories: Category[];
  // 必要に応じて id を追加しても良い (props経由で渡すなど)
  id: string; // getStaticPropsなどで追加する場合
}

import { client } from '../lib/microcms'; // clientのインポートパスは適宜変更
import { Blog, MicroCMSListResponse } from '../types'; // 型のインポート

// リスト取得
export const getBlogs = async () => {
  const blogData = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: { limit: 10 },
  });
  return blogData; // この時点で blogData は MicroCMSListResponse<Blog> 型
};

// 詳細取得
export const getBlogById = async (contentId: string) => {
  const blogDetailData = await client.get<BlogDetail>({ // BlogDetail型を指定
    endpoint: 'blogs',
    contentId,
  });
  return blogDetailData;
};


Tips:
最初は寛容に: 不明な点が多い場合、最初は多くのプロパティをオプショナル (?) にしたり、一時的に 
any
 を使ってデータ取得を優先し、徐々に型を厳密にしていくと進めやすいです。
JSON to TS ツール: quicktype.io のようなツールに実際のJSONレスポンスを貼り付けると、型の雛形を自動生成してくれます。ただし、生成された型は必ず手動で確認し、MicroCMSの特性に合わせて調整（オプショナルにする、共通型を適用するなど）が必要です。
ネスト構造の再現: データがネストしている場合は、型定義もネストさせます。
3. データ取得時に型を指定する
microcms-js-sdk を使用する場合、client.getList<YourType>() や client.get<YourType>() のようにジェネリクスで定義した型を指定します。

import { client } from '../lib/microcms'; // clientのインポートパスは適宜変更
import { Blog, MicroCMSListResponse } from '../types'; // 型のインポート

// リスト取得
export const getBlogs = async () => {
  const blogData = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: { limit: 10 },
  });
  return blogData; // この時点で blogData は MicroCMSListResponse<Blog> 型
};

// 詳細取得
export const getBlogById = async (contentId: string) => {
  const blogDetailData = await client.get<BlogDetail>({ // BlogDetail型を指定
    endpoint: 'blogs',
    contentId,
  });
  return blogDetailData;
};

4. デバッグと型の修正（最も重要なイテレーション）
型定義と実際のデータ構造が一致しない場合、microcms-js-sdk は内部でエラーをスローし、それが FetchError として現れることがあります（今回まさにこのケースです）。

エラー発生時の確認ポイント:
コンソールエラー: FetchError のようなエラーメッセージを確認。
Networkタブの再確認:
リクエストは成功しているか (Status 200 OK)。
「Response」または「Preview」タブで、ブラウザが受信した生のJSONデータと、自分の型定義を徹底的に比較します。
不一致箇所の特定と修正:
フィールド名のタイポ: 型定義のプロパティ名とJSONのキー名が完全に一致しているか（大文字・小文字含む）。
必須プロパティの欠如: 型定義で必須 (?なし) になっているプロパティが、実際のデータの一部に存在しない。
→ 型定義でオプショナル (?:) にするか、データが必ず存在するようにCMS側を修正する。
データ型の不一致:
string と定義したが実際は number や null だった。
→ 型定義を number や string | null に修正。
Array と定義したが実際は単一のオブジェクトだった（またはその逆）。
→ 型定義を修正。
画像や日付オブジェクトの構造: MicroCMSImage や MicroCMSDate の内部構造が想定と異なっていないか。
ネストされたオブジェクトの構造: 深い階層で不一致がないか。
デバッグテクニック:
console.log(rawData): client.getList や client.get で取得した直後のデータをコンソールに出力し、型推論される前の生の構造を確認する。
部分的な型で試す: 複雑な型の場合、最も基本的なフィールド（例: id, title のみ）を持つ単純な型から試し、徐々にフィールドを増やしていく。
問題のあるアイテムを特定: リストデータの場合、どのアイテムでパースに失敗しているか特定するため、contents 配列をループして1つずつ処理し、エラー箇所を絞り込む。
5. MicroCMSの繰り返しフィールドやカスタムフィールドへの対応
繰り返しフィールド: APIレスポンスでは配列として返されます。型定義も fieldName: YourRepeatedItemType[]; のようにします。
カスタムフィールド: 複雑な構造を持つ場合、それ専用の型を定義します。
まとめ
外部APIとの型連携は、地道な確認と比較作業の繰り返しになることが多いです。しかし、一度正しく設定できれば、その後の開発効率とコードの信頼性が格段に向上します。APIの仕様変更があった場合も、型エラーを頼りに修正箇所を特定しやすくなります。