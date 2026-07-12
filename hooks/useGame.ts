"use client";

import { useEffect, useState } from "react";
import { RegionStatus, GamePhase } from "@/types/game";

const INITIAL_REGION_STATUS: RegionStatus = {
  vitality: 50,
  livability: 50,
  environment: 50,
  connection: 50,
};

const INITIAL_MAX_TURNS = 6;
const STORAGE_KEY = "mugi-boardgame-lab";

export function useGame() {
  const [turn, setTurn] = useState(1);
  const [maxTurns] = useState(INITIAL_MAX_TURNS);

  const [phase, setPhase] =
    useState<GamePhase>("event");

  const [currentCardIndex, setCurrentCardIndex] =
    useState(0);

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

          setCurrentCardIndex(
            data.game.currentCardIndex ?? 0
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
          currentCardIndex,
          regionStatus,
        },
      })
    );

  }, [
    turn,
    phase,
    currentCardIndex,
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

      setCurrentCardIndex(
        (current) => current + 1
      );

      setPhase("event");
    }
  };

const completeTurn = () => {
  setTurn((current) => current + 1);

  setCurrentCardIndex((current) => current + 1);

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
  currentCardIndex,
  nextPhase,
  applyStatusEffect,
  selectIdea,
  completeTurn,
  isFinished,
};
}