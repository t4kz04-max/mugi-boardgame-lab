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

export default function GamePhaseDisplay({
  phase,
}: Props) {
  return (
    <div className="rounded-lg border p-3">
      現在：
      <strong className="ml-2">
        {LABELS[phase]}
      </strong>
    </div>
  );
}
