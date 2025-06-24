# 事例詳細ページ表示不具合の根本原因と修正計画

## 1. 問題の概要

事例詳細ページ (`/cases/[id]`) において、CMSから取得したデータが正しく表示されない。
具体的には、特定のIDの事例データを1件だけ取得するつもりが、全件の事例データリストが返ってきてしまい、コンポーネントが予期せぬデータ構造により表示エラーを起こしていた。

## 2. 根本原因

原因は、APIクライアント (`src/lib/api/serverlessClient.ts`) 内の `getCaseById` 関数の実装にあった。

```typescript
// 修正前の問題があったコード (serverlessClient.ts内)

// 詳細取得APIのエンドポイント `/cases` を使用し、idとfieldsをクエリパラメータとして渡す
const endpoint = '/cases';
const params = { id, fields };

const data = await fetchFromAPI(endpoint, params);
```

この実装では、microCMSの一覧取得APIエンドポイントである `/cases` に対して、`id` をクエリパラメータとして渡していた。
しかし、microCMSの仕様では、特定のコンテンツをIDで取得する場合、エンドポイントを `/cases/{id}` という形式にする必要がある。現在の実装では、API側が `id` パラメータをフィルタ条件として解釈せず、結果として全件のデータを返していた。

## 3. 修正計画

以下の手順で `serverlessClient.ts` を修正し、問題を根本的に解決する。

### Step 1: `getCaseById` 関数のAPIリクエストを修正

`getCaseById` 関数が正しい形式のエンドポイントをリクエストするように修正する。

- **変更前:** エンドポイント `/cases` に `id` をクエリパラメータとして渡す。
- **変更後:** エンドポイントを `/cases/${id}` という形式にし、`id` をクエリパラメータから削除する。

```typescript
// 修正後のコード案 (serverlessClient.ts内)

// 特定のIDのケースを取得する場合
if (id) {
  // ... (fieldsの定義は同じ)

  // 詳細取得APIのエンドポイントを `/cases/${id}` に修正
  const endpoint = `/cases/${id}`;
  // paramsからはidを削除
  const params = { fields };

  const data = await fetchFromAPI(endpoint, params);
  // ...
}
```

### Step 2: 事例詳細ページ (`[id].tsx`) の応急処置コードを削除

`getCaseById` が正しいデータを返すようになるため、前回 `[id].tsx` に追加した、全件データから該当IDのものを探す応急処置コードを削除し、元のシンプルな実装に戻す。

```typescript
// [id].tsxのuseEffectを元の状態に戻す

const fetchCaseData = async () => {
  setLoading(true);
  try {
    const data = await getCaseById(id);
    setCaseData(data as Case);
  } catch (err) {
    setError('事例の読み込みに失敗しました。');
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

## 4. 期待される効果

- `getCaseById` 関数が、指定されたIDの事例データ1件のみを正しく取得するようになる。
- APIからのレスポンスデータ量が削減され、パフォーマンスが向上する。
- フロントエンドのコンポーネントが期待通りのデータを受け取ることで、表示不具合が解消される。
- コードがAPIの仕様に準拠し、可読性とメンテナンス性が向上する。
