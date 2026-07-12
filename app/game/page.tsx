"use client";

import { useEffect, useState } from "react";
import CardDisplay from "@/components/game/CardDisplay";
import RegionStatus from "@/components/game/RegionStatus";
import TurnDisplay from "@/components/game/TurnDisplay";
import { useGame } from "@/hooks/useGame";
import { Button } from "@/components/ui/button";
import { cards } from "@/lib/cards";
import ReflectionForm from "@/components/game/ReflectionForm";

type Player = {
  id: number;
  name: string;
};

export default function GamePage() {
  const [players, setPlayers] = useState<Player[]>([]);

  const {
  turn,
  maxTurns,
  regionStatus,
  currentCardIndex,
  nextTurn,
  applyStatusEffect,
  isFinished,
} = useGame();

  useEffect(() => {
  const loadPlayers = () => {
    const saved = localStorage.getItem(
      "mugi-boardgame-lab"
    );

    if (!saved) return;

    const data = JSON.parse(saved);

    if (!data.players) return;

    setPlayers(data.players);
  };

  loadPlayers();
}, []);

  

  const cardSequence = [
  {
    type: "event",
    index: 0,
  },
  {
    type: "challenge",
    index: 0,
  },
  {
    type: "idea",
    index: 0,
  },
  {
    type: "inspiration",
    index: 0,
  },
] as const;

const currentCard =
  cardSequence[currentCardIndex % cardSequence.length];

const card =
  cards[currentCard.type][currentCard.index];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">
        牟岐ボードゲームラボ
      </h1>

      <TurnDisplay
  turn={turn}
  maxTurns={maxTurns}
/>
      <section className="rounded-lg border p-4">
  <h2 className="text-lg font-semibold">
    プレイヤー
  </h2>

  <ul className="mt-3 space-y-2">
    {players.map((player) => (
      <li key={player.id}>
        {player.name}
      </li>
    ))}
  </ul>
</section>

      <RegionStatus status={regionStatus} />

      <CardDisplay card={card} />
      {isFinished ? (
  <>
    <section className="rounded-lg border p-4 space-y-3">
      <h2 className="text-lg font-semibold">
        ゲーム終了
      </h2>

      <p>
        参加者全員で振り返りを行いましょう。
      </p>
    </section>

    <ReflectionForm />
  </>
) : (
  <>
  {card.type === "idea" && (
    <Button
      onClick={() =>
        applyStatusEffect(card.statusEffects)
      }
    >
      取り組みを実行する
    </Button>
  )}

  <Button onClick={nextTurn}>
    次のターンへ
  </Button>
</>
)}
    </main>
  );
}