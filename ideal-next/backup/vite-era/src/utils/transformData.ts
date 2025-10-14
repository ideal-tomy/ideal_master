// src/utils/transformData.ts
import { AICapabilityDetail } from '../types/capability';

export const transformCapabilityData = (rawData: any): AICapabilityDetail => {
    return {
      id: rawData.id,
      title: "勤怠管理自動化: UiPath/Power Automateで管理工数70%削減を実現",
      summary: "勤怠管理は多くの組織で時間と人的リソースを消費する業務です。UiPathやMicrosoft Power Automateを活用したRPA（ロボティック・プロセス・オートメーション）により、時間記録の収集からルール適用、報告書作成までを自動化。人事・管理部門の工数削減と正確性向上を同時に実現します。",
      industries: [
        {
          name: "製造業",
          description: "シフト制の工場勤務管理に最適"
        },
        {
          name: "小売・サービス業",
          description: "アルバイト・パート勤怠管理の効率化"
        },
        // ... 他の業種も同様に
      ],
      roles: [
        {
          name: "人事労務担当者",
          description: "勤怠管理業務の効率化"
        },
        {
          name: "総務部門マネージャー",
          description: "バックオフィス業務の最適化"
        },
        // ... 他の職種も同様に
      ],
      challenges: [
        {
          title: "勤怠データの収集・集計に多くの時間を要している",
          description: "手作業による集計作業の負担が大きい"
        },
        // ... 他の課題も同様に
      ],
      metrics: {
        scale: [
          "従業員数：30名以上",
          "月間勤怠処理時間：20時間以上",
          "複数の勤務形態や拠点がある組織"
        ],
        organizationSize: "中規模以上"
      },
      useCases: [
        {
          title: "月次勤怠集計の自動化",
          description: "月末になると、RPAが各システムから勤怠データを自動収集し、ルールに基づいて計算。",
          example: "翌日朝には完成したレポートが管理者のメールボックスに届き、従来3日かかっていた作業が完全自動化されます。"
        },
        // ... 他の活用シーンも同様に
      ],
      effects: {
        quantitative: [
          { metric: "勤怠管理工数", value: "▲70%削減" },
          { metric: "データ入力ミス", value: "▲95%削減" },
          { metric: "レポート作成時間", value: "1日→15分（97%削減）" }
        ],
        qualitative: [
          "人事担当者の高付加価値業務への時間シフト",
          "労務コンプライアンスリスクの低減",
          "リアルタイムな労務状況の可視化による経営判断の迅速化"
        ]
      },
      tools: [
        {
          name: "UiPath Automation Cloud",
          description: "クラウドベースで導入しやすく、複雑な勤怠ルールも柔軟に設定可能。AI機能による異常検知も強力。"
        },
        // ... 他のツールも同様に
      ],
      implementation: {
        steps: [
          "現行の勤怠管理プロセスの可視化と自動化対象の特定",
          "勤務ルールとワークフローの定義・設計",
          "RPAツールの選定と初期設定",
          "テスト運用と並行稼働（1〜2ヶ月）",
          "完全移行と継続的な改善"
        ],
        duration: "2〜3ヶ月",
        cost: "中規模（50〜200万円）",
        difficulty: 3,
        resources: "管理者0.1FTE程度（月間4時間程度）",
        roi: "通常6〜12ヶ月で投資回収"
      },
      cautions: [
        "既存勤怠システムのAPIやデータ構造によっては連携に追加開発が必要",
        "非定型的な勤務形態や例外処理は人的判断が必要な場合あり",
        "定期的なルール更新とメンテナンスが必須"
      ],
      relatedFeatures: [
        {
          title: "経費精算自動化",
          description: "勤怠データと連携した経費処理の効率化"
        },
        {
          title: "人事データ分析",
          description: "勤怠データを活用した働き方改革の推進事例"
        }
      ]
    };
  };