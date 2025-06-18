# 事例紹介 APIスキーマ (改訂版)

- **タイトル (title)**
  - フィールドID: `title`
  - 種類: テキストフィールド
- **概要 (description)**
  - フィールドID: `description`
  - 種類: テキストエリア
- **サムネイル画像 (thumbnail)**
  - フィールドID: `thumbnail`
  - 種類: 画像
- **事例カテゴリ (caseType)**
  - フィールドID: `caseType`
  - 種類: セレクトフィールド
- **カテゴリ (coreTechnologies)**
  - フィールドID: `coreTechnologies`
  - 種類: セレクトフィールド
- **使用技術 (frameworks)**
  - フィールドID: `frameworks`
  - 種類: セレクトフィールド
- **目的タグ (purposeTags)**
  - フィールドID: `purposeTags`
  - 種類: セレクトフィールド
- **対象業種 (industry)**
  - フィールドID: `industry`
  - 種類: セレクトフィールド
- **関係職種 (roles)**
  - フィールドID: `roles`
  - 種類: セレクトフィールド
- **解決できる課題 (problems)**
  - フィールドID: `problems`
  - 種類: テキストエリア
- **期待できる効果 (effects)**
  - フィールドID: `effects`
  - 種類: テキストエリア
- **実装までの流れ (implementationSteps)**
  - フィールドID: `implementationSteps`
  - 種類: テキストエリア
- **デモタイプ (demoType)**
  - フィールドID: `demoType`
  - 種類: セレクトフィールド
- **デモURL（体験用） (demoUrl)**
  - フィールドID: `demoUrl`
  - 種類: テキストフィールド
- **動画URL（埋め込み） (videoUrl)**
  - フィールドID: `videoUrl`
  - 種類: テキストフィールド
- **本文（詳細説明） (body)**
  - フィールドID: `body`
  - 種類: リッチエディタ
- **ギャラリー画像 (gallery)**
  - フィールドID: `gallery`
  - 種類: 複数画像
- **関連記事 (relatedCases)**
  - フィールドID: `relatedCases`
  - 種類: 複数コンテンツ参照（事例紹介）

---

**補足:**
- 上記はユーザー様からご提供いただいた情報と画像に基づいています。
- 実際のAPIレスポンスには、これ以外にもmicroCMSのシステムデフォルトフィールド（`id`, `createdAt`, `updatedAt`, `publishedAt`, `revisedAt`）が含まれます。
- セレクトフィールドや複数コンテンツ参照の場合、実際の値の形式（文字列、オブジェクトの配列など）はAPIレスポンスで確認が必要です。
- **型定義の注意:** `src/types/case.ts` の `relatedArticles` は `relatedCases` に名称を合わせ、型も `(Case & MicroCMSListContent)[]` など具体的な型に修正を推奨。

---

✅ 事例紹介の表示構成（一覧／詳細）
📄 1. 一覧ページ（/cases）で表示する内容
🔸 表示目的
訪問者が興味ある事例をサクッと探せること。
なので「概要・タグ・ビジュアル・CTA」の簡潔表示が基本。

✅ 推奨カード構成
表示要素	対応フィールドID	表示形式・補足
サムネイル画像	thumbnail	カード上部 or 左側に表示
タイトル	title	H3くらいの目立つテキスト
概要	description	2〜3行の短い要約
タグ	purposeTags, caseType	`purposeTags` を優先的に表示。スペースに余裕があれば `caseType` も表示するか、クリックで切り替えられるUIも検討。
CTAボタン	—	「詳しく見る」→ /cases/[id] へ遷移


UI例（ざっくり構成）
<Card>
  <Image src={thumbnail.url} />
  <h3>{title}</h3>
  <p>{description}</p>
  <TagList tags={purposeTags} caseType={caseType} /> {/* caseTypeも渡す想定 */}
  <Link href={`/cases/${id}`}>詳しく見る</Link>
</Card>

2. 詳細ページ（/cases/[id]）で表示する内容
🔸 表示目的
「この事例って、自分に使えるのか？」が深くわかること。
→ 導入背景 → 使用技術 → 効果 → デモ体験 という順がわかりやすい。

⚠️ **データ取得・表示の一般的な注意点:**
-   **フィールド名:** microCMSからのデータアクセス時は、フィールドID（例: `coreTechnologies`）の**キャメルケース**でアクセスしてください。
-   **型定義:** `src/pages/cases/[id].tsx` 内の `caseData` のstateは、`src/types/case.ts` で定義した `Case` 型を使用してください (`useState<(Case & MicroCMSListContent) | null>(null)`)。

✅ 推奨セクション構成
セクション	表示要素	フィールドID	備考
Hero	title, thumbnail	タイトルと大きなビジュアル
1. 導入背景	problems	なぜ必要だったか (このセクションの表示を追加)
2. 実現したかったこと	effects	どんな価値が得られたか (このセクションの表示を追加)
3. 使用技術・構成	coreTechnologies, frameworks	タグ表示やリスト可
4. 実装の流れ	implementationSteps	箇条書きまたは説明文
5. 詳細説明（本文）	body	リッチエディタから整形して表示
6. デモ	demoType, demoUrl, videoUrl	`demoType` の値 (`demoTool`, `demoVideo`, `articleOnly`) に応じて表示内容を分岐させる。
7. 関連記事	relatedCases	他の事例カードを並べる。型定義と合わせて `relatedCases` を使用。
8. ギャラリー	gallery	スライダー形式 or モーダル画像表示

🧩 UI例（詳細ページ）
<Hero title={title} image={thumbnail} />

<Section title="導入背景" content={problems} /> {/* problems を表示 */}
<Section title="期待される効果" content={effects} /> {/* effects を表示 */}
<TagSection tech={coreTechnologies} frameworks={frameworks} />
<Section title="実装の流れ" content={implementationSteps} />
<RichText content={body} />

<DemoCTA type={demoType} url={demoUrl} videoUrl={videoUrl} /> {/* demoType に応じた分岐を考慮 */}

<Gallery images={gallery} />
<RelatedCases items={relatedCases} /> {/* relatedCases を使用 */}

---
**※ `caseData.categories` について:**
詳細ページコンポーネント (`src/pages/cases/[id].tsx`) 内で `caseData.categories` が使用されていますが、これは現在のスキーマ定義 (`case_study_schema.md` および `src/types/case.ts`) には存在しません。
`caseType` や `coreTechnologies` の誤りか、あるいは別の意図のデータか確認し、不要であれば削除、必要であればスキーマと型定義への追加を検討してください。
