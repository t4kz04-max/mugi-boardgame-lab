"use client";

import { GamePhase } from "@/types/game";

type Props = {
  phase: GamePhase;
};

const LABELS: Record<GamePhase, string> = {
  event: "未来イベント",
  challenge: "課題確認",
  discussion: "対話",
  idea: "アイデア選択",
  result: "地域状態更新",
  reflection: "振り返り",
  finished: "ゲーム終了",
};
const DESCRIPTIONS: Record<GamePhase, string> = {
  event: "未来に起こる出来事を確認しましょう。",
  challenge: "地域が抱える課題を読みましょう。",
  discussion: "プレイヤー同士で自由に話し合いましょう。",
  idea: "取り組みたいアイデアを1つ選びましょう。",
  result: "選択したアイデアの結果を確認します。",
  reflection: "今回のターンを振り返りましょう。",
  finished: "ゲームは終了です。全体を振り返りましょう。",
};

const PHASES: GamePhase[] = [
  "event",
  "challenge",
  "discussion",
  "idea",
  "result",
  "reflection",
];

export default function GamePhaseDisplay({
  phase,
}: Props) {
  return (
    <div className="rounded-xl border shadow-sm">
  <div className="border-b bg-gray-50 px-4 py-3">
    <h2 className="text-lg font-semibold">
      📍 現在のフェーズ
    </h2>
  </div>

  <div className="space-y-2 px-4 py-4">
    <p className="text-xl font-bold">
      {LABELS[phase]}
    </p>

    <p className="text-sm text-gray-600">
      {DESCRIPTIONS[phase]}
    </p>
    <div className="mt-5 space-y-2">
  {PHASES.map((item, index) => {
    const current =
      PHASES.indexOf(phase);

    const completed =
      index < current;

    const active =
      index === current;

    return (
      <div
        key={item}
        className="flex items-center gap-3"
      >
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
            active
              ? "bg-blue-600 text-white"
              : completed
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {completed ? "✓" : index + 1}
        </div>

        <span
          className={
            active
              ? "font-semibold text-blue-700"
              : completed
              ? "text-gray-700"
              : "text-gray-400"
          }
        >
          {LABELS[item]}
        </span>
      </div>
    );
  })}
</div>
  </div>
</div>
  );
}

