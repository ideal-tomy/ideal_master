# 事例紹介機能 実装タスクリスト

## 1. 型定義の修正 (`src/types/case.ts`)
- [ ] `relatedArticles` を `relatedCases` に名称変更する。
- [ ] `relatedCases` の型を `(Case & MicroCMSListContent)[]` または、カード表示に必要なプロパティを `Pick` した型など、具体的な型に修正する。

## 2. 一覧ページカードコンポーネントの修正 (`src/components/cases/CaseCard.tsx`)
- [ ] Propsの `thumbnail` の型を `MicroCMSImage | undefined` に修正する。
- [ ] `case_study_schema.md` の指示に基づき、`caseType` の表示を検討・実装する (必要に応じてPropsに `caseType` を追加)。

## 3. 詳細ページコンポーネントの修正 (`src/pages/cases/[id].tsx`)
- [ ] `caseData` の `useState` の型を `(Case & MicroCMSListContent) | null` に修正する。
- [ ] データアクセス時のプロパティ名を全てキャメルケースに統一する (例: `caseData.core_technologies` -> `caseData.coreTechnologies`)。
- [ ] 「導入背景」セクションを追加し、`caseData.problems` を表示するロジックを実装する。
- [ ] 「実現したかったこと」セクションを追加し、`caseData.effects` を表示するロジックを実装する。
- [ ] デモセクションの表示ロジックを `caseData.demoType` の値 (`demoTool`, `demoVideo`, `articleOnly`) に応じて分岐させるように修正する。
- [ ] `caseData.categories` の使用箇所を確認し、`case_study_schema.md` の定義と照らし合わせて修正または削除する。
- [ ] `relatedCases` のデータ取得と表示ロジックを、修正後の型定義 (`relatedCases`) に合わせて調整する。

## 4. ドキュメントの整合性確認 (`case_study_schema.md`)
- [ ] 本タスクリストの実施後、`case_study_schema.md` の内容と実装に齟齬がないか最終確認する。

## 5. 動作確認と最終レビュー
- [ ] 上記修正後、一覧ページと詳細ページの表示が `case_study_schema.md` の定義通りになっているか確認する。
- [ ] Webブラウザのコンソールでエラーが発生していないか確認する。
- [ ] 型エラーがビルド時やエディタで表示されていないか確認する。
- [ ] レスポンシブ表示など、基本的なUIの確認を行う。
