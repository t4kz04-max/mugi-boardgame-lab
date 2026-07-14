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
  currentEventIndex,
  currentChallengeIndex,
  currentIdeaIndex,
  eventOrder,
  ideaOrder,
  challengeOrder,
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

console.log(
  "EVENT DEBUG",
  {
    eventOrder,
    currentEventIndex,
    eventIndex:
      eventOrder[currentEventIndex],
    title:
      cards.event[
        eventOrder[currentEventIndex]
      ]?.title
  }
);

console.log("CHALLENGE DEBUG", {
  challengeOrder,
  currentChallengeIndex,
  challengeIndex:
    challengeOrder[currentChallengeIndex],
  title:
    cards.challenge[
      challengeOrder[currentChallengeIndex]
    ]?.title,
});

const eventCard =
  eventOrder.length > 0
    ? cards.event[
        eventOrder[currentEventIndex]
      ]
    : cards.event[0];

const challengeCard =
  challengeOrder.length > 0
    ? cards.challenge[
        challengeOrder[currentChallengeIndex]
      ]
    : cards.challenge[0];

const currentCard =
  phase === "event"
    ? eventCard
    : challengeCard;

  const ideaCards =
  ideaOrder
    .slice(
      currentIdeaIndex,
      currentIdeaIndex + 3
    )
    .map(
      (index) => cards.idea[index]
    );

  console.log("PHASE CHECK:", phase);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col gap-6 px-4 py-8">
      <header className="space-y-2 text-center">
  <h1 className="text-3xl font-bold tracking-tight">
    牟岐ボードゲームラボ
  </h1>

  <p className="text-sm text-gray-600">
    地域について対話し、未来を考える協力型ボードゲーム
  </p>
</header>

      <section className="rounded-xl border bg-gray-50 p-4 space-y-4">
  <TurnDisplay
    turn={turn}
    maxTurns={maxTurns}
  />

  <GamePhaseDisplay phase={phase} />
</section>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
  <h2 className="mb-3 text-lg font-semibold">
  👥 参加プレイヤー
</h2>

  <ul className="flex flex-wrap gap-2">
    {players.map((player) => (
      <li
  key={player.id}
  className="rounded-full border bg-gray-100 px-4 py-2 text-sm font-medium"
>
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
  <section className="rounded-xl border shadow-sm">
    <div className="border-b bg-green-50 px-4 py-3">
  <h2 className="text-lg font-semibold text-green-700">
    ✅ 地域状態を更新しました
  </h2>
</div>

<div className="px-4 py-4">
  <p className="text-gray-700">
    選択した取り組みの効果を町の状態へ反映しました。
  </p>
</div>
  </section>
) : phase === "reflection" ? (
  <ReflectionForm />
) : phase === "discussion" ? (
  <section className="rounded-xl border shadow-sm">
    <div className="border-b bg-blue-50 px-4 py-3">
  <h2 className="text-lg font-semibold text-blue-700">
    💬 話し合い
  </h2>
</div>

<div className="px-4 py-4">
  <p className="text-gray-700">
    プレイヤー全員で自由に意見を出し合いましょう。
  </p>
</div>
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
  <Button
  className="w-full h-12 text-base font-semibold"
  onClick={nextPhase}
>
  振り返りへ
</Button>
)}

{phase === "reflection" && (
  <Button
  className="w-full h-12 text-base font-semibold"
  onClick={completeTurn}
>
  次のターンへ
</Button>
)}

{phase !== "idea" &&
 phase !== "result" &&
 phase !== "reflection" &&
 (
  <Button
  className="w-full h-12 text-base font-semibold"
  onClick={nextPhase}
>
  次へ
</Button>
)}
</>
)}
    </main>
  );
}