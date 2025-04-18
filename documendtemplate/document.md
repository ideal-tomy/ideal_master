# AI機能詳細記事作成用テンプレート

このテンプレートを使用して、microCMSの「AIケイパビリティ」コンテンツタイプに投稿するための詳細な記事を生成できます。各セクションはCMSの対応するフィールドに合わせて構成されています。

## 基本プロンプト

```
以下の情報に基づいて、AIツール/機能の詳細な解説記事を作成してください。初心者にもわかりやすく、専門用語は解説を入れ、具体例を多く含めてください：

タイトル: [タイトルを入力]
概要: [簡単な説明を入力]
カテゴリ: [該当するカテゴリを入力（複数可）]
使用するAI技術: [GPT-4, Azure OpenAI, Gemini, Stable Diffusion, MidJourney など]
難易度レベル: [1-5の範囲で入力]

以下の各セクションごとに内容を作成してください。専門用語を使う場合は必ず解説を入れ、実際の業務での具体例を含めてください。
```

## 出力構成（コピペ用）

### 基本情報
- **タイトル**: [AI機能のタイトル]
- **説明**: [簡潔な説明文 (100字程度)]
- **カテゴリ**: [複数のカテゴリをカンマ区切り]
- **使用技術**: [関連AI技術をカンマ区切り]
- **難易度レベル**: [1-5]

### セクション内容

#### detail01（開発難易度）
```
## 開発難易度

難易度レベル: ★★★☆☆

- 必要な技術スキル: [スキル内容]
- 連携システム: [関連システム]
- 開発期間目安: [期間]
```

#### detail02（概要）
```
## 概要

[詳細な概要説明]

[ユースケースや背景情報]
```

#### detail03（関連業種）
```
## 関連業種

### [業種1]
[この業種での活用メリット]

### [業種2]
[この業種での活用メリット]

<!-- 3-5つの業種 -->
```

#### detail04（関連職種）
```
## 関連職種

### [職種1]
[この職種での活用メリット]

### [職種2]
[この職種での活用メリット]

<!-- 3-5つの職種 -->
```

#### detail05（解決できる課題）
```
## 解決できる課題

### 課題1: [課題タイトル]
[課題の詳細説明]

### 課題2: [課題タイトル]
[課題の詳細説明]

### 規模感の目安
- [業務量の指標]
- [リソースの指標]
- [コストの指標]
```

#### detail06（課題の詳細解説）
```
## 課題の詳細解説

[現状の課題についての詳細な解説]

[なぜこの課題が重要なのかの説明]

[従来の解決方法とその限界]
```

#### detail07（活用シーン）
```
## 活用シーン

### [シーン1]
[具体的な活用方法の説明]

### [シーン2]
[具体的な活用方法の説明]

<!-- 3-4つのシーン -->
```

#### detail08（期待できる効果）
```
## 期待できる効果

### 効果1: [効果タイトル]
[具体的な効果の説明と可能であれば数値]

### 効果2: [効果タイトル]
[具体的な効果の説明と可能であれば数値]

<!-- 3-4つの効果 -->
```

#### detail09（おすすめツール）
```
## おすすめツール

### [ツール名1]
[ツールの特徴と使いどころ]

### [ツール名2]
[ツールの特徴と使いどころ]

### [ツール名3]
[ツールの特徴と使いどころ]
```

#### detail10（導入ステップ）
```
## 導入ステップ

1. **ステップ1: [ステップタイトル]**  
   [詳細な手順説明]

2. **ステップ2: [ステップタイトル]**  
   [詳細な手順説明]

<!-- 4-5つのステップ -->
```

#### detail11（注意点・制限事項）
```
## 注意点・制限事項

### [注意点1]
[詳細説明と対処法]

### [注意点2]
[詳細説明と対処法]

<!-- 3-5つの注意点 -->
```

#### detail12（主要検討項目）
```
## 主要検討項目

### [検討項目1]
[検討すべき内容と判断基準]

### [検討項目2]
[検討すべき内容と判断基準]

<!-- 3-5つの検討項目 -->
```

#### detail13（まとめ）
```
## まとめ

[機能の主要なメリットの要約]

[導入に向けた最終的なアドバイス]

[将来の展望や発展可能性]
```

## 使用例

### 入力例
```
以下の情報に基づいて、AIツール/機能の詳細な解説記事を作成してください。初心者にもわかりやすく、専門用語は解説を入れ、具体例を多く含めてください：

タイトル: 顧客管理へのAI活用
概要: 顧客データを分析し、行動パターンの予測や顧客ニーズの把握を自動化することで、効率的な顧客管理を実現するAIソリューション
カテゴリ: sales_support, data_analysis, customer_support
使用するAI技術: GPT-4, Azure Machine Learning, Tableau
難易度レベル: 3
```

### 出力例（部分）

#### detail01（開発難易度）
```
## 開発難易度

難易度レベル: ★★★☆☆

- 必要な技術スキル: データ分析の基礎知識、APIの連携経験、基本的なプログラミングスキル
- 連携システム: CRMシステム、マーケティングオートメーションツール、分析ダッシュボード
- 開発期間目安: 2〜3ヶ月
```

#### detail02（概要）
```
## 概要

顧客管理AIソリューションは、企業に蓄積された顧客データを高度に分析し、顧客の行動パターンを予測するとともに、個々の顧客ニーズを自動的に把握する仕組みです。従来の顧客管理システム（CRM）が単なるデータベースとしての機能が中心だったのに対し、AI活用型の顧客管理では、データから有意義なインサイト（洞察）を自動的に抽出し、パーソナライズされた顧客対応を可能にします。

例えば、あるEC事業者では、過去の購買履歴から「この商品を購入した人はこんな商品も購入しています」という推奨を自動表示するだけでなく、顧客の閲覧パターン、購入タイミング、問い合わせ内容などを総合的に分析し、個々の顧客にとって最適なタイミングで最適な商品を提案できるようになりました。

近年、顧客データの多様化と増大に伴い、人力での分析や対応が限界を迎えていました。AIを活用することで、大量のデータから迅速に重要なパターンを見つけ出し、顧客一人ひとりに最適なアプローチを導き出すことができます。これにより、顧客満足度の向上、離反防止、販売機会の最大化といった成果につながります。
```

## 初心者向け記事作成のガイドライン

AI機能記事を初心者にもわかりやすく作成するための重要なポイントを以下にまとめます：

### 1. 専門用語の解説を必ず含める
- 専門用語を使用する場合は、括弧書きで簡潔な説明を加える
  - 例: 「機械学習（コンピュータがデータから自動的に学習する技術）を活用することで...」
- 必要に応じて、用語集セクションを追加することも効果的

### 2. 具体例を豊富に入れる
- 業界別の具体的な活用例
- 「Before/After」の比較
- 実際の企業での実装事例（可能であれば）

### 3. ステップバイステップで説明する
- 複雑な概念や実装方法は段階的に説明
- 各ステップで達成される目標を明確に
- チェックポイントや成功指標を提示

### 4. 視覚的要素の提案を含める
- フローチャートやプロセス図の活用
- スクリーンショットや操作画面の例
- データの可視化例

### 5. メリットとデメリットをバランスよく
- メリットだけでなく、制限事項や注意点も正直に説明
- 課題への対処法も合わせて提案
- 費用対効果や投資回収の目安も示す

### 6. 難易度に応じた説明の詳細度を調整
- 難易度が低い（1-2）: より基本的な説明、技術的詳細は最小限に
- 難易度が中程度（3）: バランスの取れた説明、重要な技術的詳細を含める
- 難易度が高い（4-5）: より詳細な技術的説明、実装の複雑さも正直に伝える

上記のガイドラインを意識して記事を作成することで、技術的背景を持たない初心者でも理解しやすい内容になります。
