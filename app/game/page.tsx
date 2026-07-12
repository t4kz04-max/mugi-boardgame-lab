"use client";

import { useEffect, useState } from "react";
import CardDisplay from "@/components/game/CardDisplay";
import RegionStatus from "@/components/game/RegionStatus";
import TurnDisplay from "@/components/game/TurnDisplay";
import { useGame } from "@/hooks/useGame";
import { Button } from "@/components/ui/button";
import { cards } from "@/lib/cards";
import ReflectionForm from "@/components/game/ReflectionForm";
import GamePhaseDisplay from "@/components/game/GamePhaseDisplay";
import IdeaSelector from "@/components/game/IdeaSelector";

type Player = {
  id: number;
  name: string;
};

export default function GamePage() {
  const [players, setPlayers] = useState<Player[]>([]);

  const {
  turn,
  maxTurns,
  phase,
  regionStatus,
  currentCardIndex,
  nextPhase,
  selectIdea,
  completeTurn,
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


const eventCard =
  cards.event[currentCardIndex % cards.event.length];

const challengeCard =
  cards.challenge[currentCardIndex % cards.challenge.length];

const currentCard =
  phase === "event"
    ? eventCard
    : challengeCard;

  const ideaCards =
  cards.idea.slice(0, 3);

  console.log("PHASE CHECK:", phase);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">
        牟岐ボードゲームラボ
      </h1>

      <TurnDisplay
  turn={turn}
  maxTurns={maxTurns}
/>

<p>{phase}</p>
<GamePhaseDisplay phase={phase} />

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

      {phase === "idea" ? (
  <IdeaSelector
    ideas={ideaCards}
    onSelect={(idea) =>
      selectIdea(
        idea.statusEffects
      )
    }
  />
) : phase === "result" ? (
  <section className="rounded-lg border p-4">
    <h2 className="text-lg font-semibold">
      地域状態を更新しました
    </h2>

    <p className="mt-2">
      選択した取り組みの効果が反映されました。
    </p>
  </section>
) : phase === "reflection" ? (
  <ReflectionForm />
) : phase === "discussion" ? (
  <section className="rounded-lg border p-4">
    <h2 className="text-lg font-semibold">
      話し合い
    </h2>

    <p className="mt-2">
      プレイヤー全員で意見を出し合いましょう。
    </p>
  </section>
) : (
  <CardDisplay card={currentCard} />
)}
      
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
  
  {phase === "result" && (
  <Button onClick={nextPhase}>
    振り返りへ
  </Button>
)}

{phase === "reflection" && (
  <Button onClick={completeTurn}>
    次のターンへ
  </Button>
)}

{phase !== "idea" &&
 phase !== "result" &&
 phase !== "reflection" &&
 (
  <Button onClick={nextPhase}>
    次へ
  </Button>
)}
</>
)}
    </main>
  );
}