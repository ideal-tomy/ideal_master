import { AICapability, AICapabilityDetail } from '../types/capability';

export const transformToDetailFormat = (rawData: AICapability): AICapabilityDetail => {
  return {
    ...rawData,
    summary: rawData.description,
    industries: [
      { name: "製造業", description: "シフト制の工場勤務管理に最適" },
      { name: "小売・サービス業", description: "アルバイト・パート勤怠管理の効率化" },
      { name: "IT・システム開発", description: "フレックス勤務・リモートワーク管理" }
    ],
    roles: [
      { name: "人事労務担当者", description: "勤怠管理業務の効率化" },
      { name: "総務部門マネージャー", description: "バックオフィス業務の最適化" },
      { name: "経営企画担当者", description: "労務コスト分析の高度化" }
    ],
    challenges: [
      { title: "勤怠データの収集・集計に多くの時間を要している", description: "手作業による集計作業の負担が大きい" },
      { title: "勤務実績の可視化が困難", description: "労働時間の正確な把握ができていない" }
    ],
    metrics: {
      scale: ["従業員数：30名以上", "月間勤怠処理時間：20時間以上"],
      organizationSize: "中規模以上"
    },
    useCases: [
      { title: "月次勤怠集計の自動化", description: "月末の勤怠データ自動収集と計算", example: "従来3日→自動化で15分" }
    ],
    effects: {
      quantitative: [
        { metric: "勤怠管理工数", value: "▲70%削減" },
        { metric: "データ入力ミス", value: "▲95%削減" }
      ],
      qualitative: ["人事担当者の高付加価値業務への時間シフト", "労務コンプライアンスリスクの低減"]
    },
    tools: [
      { name: "UiPath Automation Cloud", description: "クラウドベースで導入しやすく、複雑な勤怠ルールも柔軟に設定可能" }
    ],
    implementation: {
      steps: ["現行プロセスの可視化", "勤務ルールの定義", "RPAツールの選定", "テスト運用", "完全移行"],
      duration: "2〜3ヶ月",
      cost: "中規模（50〜200万円）",
      difficulty: 3,
      resources: "管理者0.1FTE程度",
      roi: "通常6〜12ヶ月で投資回収"
    },
    cautions: [
      "既存勤怠システムのAPIによっては連携に追加開発が必要",
      "非定型的な勤務形態は人的判断が必要な場合あり"
    ],
    relatedFeatures: [
      { title: "経費精算自動化", description: "勤怠データと連携した経費処理の効率化" }
    ]
  };
}; 