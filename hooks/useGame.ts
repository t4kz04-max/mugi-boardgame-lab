"use client";

import { useEffect, useState } from "react";
import { RegionStatus, GamePhase } from "@/types/game";
import { cards } from "@/lib/cards";

const INITIAL_REGION_STATUS: RegionStatus = {
  vitality: 50,
  livability: 50,
  environment: 50,
  connection: 50,
};

const INITIAL_MAX_TURNS = 6;
const STORAGE_KEY = "mugi-boardgame-lab";
function createShuffleOrder(length: number) {
  const array = Array.from(
    { length },
    (_, index) => index
  );

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [array[i], array[j]] = [
      array[j],
      array[i],
    ];
  }

  return array;
}

export function useGame() {
  const [turn, setTurn] = useState(1);
  const [maxTurns] = useState(INITIAL_MAX_TURNS);

  const [phase, setPhase] =
    useState<GamePhase>("event");

  const [currentEventIndex, setCurrentEventIndex] =
  useState(0);

  const [currentChallengeIndex, setCurrentChallengeIndex] =
  useState(0);

  const [currentIdeaIndex, setCurrentIdeaIndex] =
  useState(0);

  const [eventOrder, setEventOrder] =
  useState<number[]>(
    () => createShuffleOrder(cards.event.length)
  );

const [challengeOrder, setChallengeOrder] =
  useState<number[]>(
    () => createShuffleOrder(cards.challenge.length)
  );

const [ideaOrder, setIdeaOrder] =
  useState<number[]>(
    () => createShuffleOrder(cards.idea.length)
  );

  const [regionStatus, setRegionStatus] =
    useState<RegionStatus>(
      INITIAL_REGION_STATUS
    );

  const [loaded, setLoaded] =
    useState(false);


  useEffect(() => {
  const loadGame = () => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const data = JSON.parse(saved);

        if (data.game) {
          setTurn(data.game.turn ?? 1);

          setPhase("event");

          setCurrentEventIndex(
  data.game.currentEventIndex ??
    data.game.currentCardIndex ??
    0
);

if (
  data.game.eventOrder &&
  data.game.eventOrder.length > 0
) {
  setEventOrder(
    data.game.eventOrder
  );
}

if (
  data.game.challengeOrder &&
  data.game.challengeOrder.length > 0
) {
  setChallengeOrder(
    data.game.challengeOrder
  );
}

if (
  data.game.ideaOrder &&
  data.game.ideaOrder.length > 0
) {
  setIdeaOrder(
    data.game.ideaOrder
  );
}

setCurrentChallengeIndex(
  data.game.currentChallengeIndex ??
    data.game.currentCardIndex ??
    0
);

setCurrentIdeaIndex(
  data.game.currentIdeaIndex ?? 0
);

          setRegionStatus(
            data.game.regionStatus ??
            INITIAL_REGION_STATUS
          );
        }
      } catch {
        localStorage.removeItem(
          STORAGE_KEY
        );
      }
    }else {
    setEventOrder(
      createShuffleOrder(cards.event.length)
    );

    setChallengeOrder(
      createShuffleOrder(cards.challenge.length)
    );

    setIdeaOrder(
      createShuffleOrder(cards.idea.length)
    );
}


    setLoaded(true);
  };

  loadGame();
}, []);


  useEffect(() => {
    if (!loaded) return;

    const saved =
      localStorage.getItem(STORAGE_KEY);

      

    const data = saved
      ? JSON.parse(saved)
      : {};

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...data,
        game: {
          turn,
          phase,
          currentEventIndex,
          currentChallengeIndex,
          currentIdeaIndex,
          eventOrder,
          challengeOrder,
          ideaOrder,
          regionStatus,
        },
      })
    );

  }, [
    turn,
    phase,
    currentEventIndex,
    currentChallengeIndex,
    currentIdeaIndex,
    eventOrder,
    challengeOrder,
    regionStatus,
    loaded,
  ]);


  const nextPhase = () => {

    if (phase === "event") {
      setPhase("challenge");
      return;
    }

    if (phase === "challenge") {
      setPhase("discussion");
      return;
    }

    if (phase === "discussion") {
      setPhase("idea");
      return;
    }

    if (phase === "result") {
      setPhase("reflection");
      return;
    }

    if (phase === "reflection") {

      if (turn >= maxTurns) {
        setPhase("finished");
        return;
      }

      setTurn(
        (current) => current + 1
      );

      setCurrentEventIndex(
  (current) => current + 1
);

setCurrentChallengeIndex(
  (current) => current + 1
);

setCurrentIdeaIndex(
  (current) => current + 3
);

      setPhase("event");
    }
  };

const completeTurn = () => {
  if (turn >= maxTurns) {
    setPhase("finished");
    return;
  }

  setTurn((current) => current + 1);

  setCurrentEventIndex(
    (current) => current + 1
  );

  setCurrentChallengeIndex(
    (current) => current + 1
  );

  setCurrentIdeaIndex(
    (current) => current + 3
  );

  setPhase("event");
};


  const applyStatusEffect = (
    effects: Partial<RegionStatus>
  ) => {

    setRegionStatus((current) => ({
      vitality: Math.min(
        100,
        Math.max(
          0,
          current.vitality +
          (effects.vitality ?? 0)
        )
      ),

      livability: Math.min(
        100,
        Math.max(
          0,
          current.livability +
          (effects.livability ?? 0)
        )
      ),

      environment: Math.min(
        100,
        Math.max(
          0,
          current.environment +
          (effects.environment ?? 0)
        )
      ),

      connection: Math.min(
        100,
        Math.max(
          0,
          current.connection +
          (effects.connection ?? 0)
        )
      ),
    }));
  };


  const selectIdea = (
    effects: Partial<RegionStatus>
  ) => {

    applyStatusEffect(effects);

    setPhase("result");
  };


  const isFinished =
    phase === "finished";


  return {
  turn,
  maxTurns,
  phase,
  regionStatus,
  currentEventIndex,
  currentChallengeIndex,
  currentIdeaIndex,
  eventOrder,
  challengeOrder,
  ideaOrder,
  nextPhase,
  applyStatusEffect,
  selectIdea,
  completeTurn,
  isFinished,
};
}