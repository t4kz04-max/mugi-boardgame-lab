"use client";

import { useEffect, useState } from "react";
import { RegionStatus } from "@/types/game";

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
const [currentCardIndex, setCurrentCardIndex] = useState(0);
const [maxTurns] = useState(INITIAL_MAX_TURNS);
const [regionStatus, setRegionStatus] = useState(
  INITIAL_REGION_STATUS
);

const [loaded, setLoaded] = useState(false);
  useEffect(() => {
  const loadGame = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setLoaded(true);
      return;
    }

    try {
      const data = JSON.parse(saved);

      if (data.game) {
        setTurn(data.game.turn ?? 1);

        setCurrentCardIndex(
          data.game.currentCardIndex ?? 0
        );

        setRegionStatus(
          data.game.regionStatus ?? INITIAL_REGION_STATUS
        );
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setLoaded(true);
  };

  loadGame();
}, []);

  const nextTurn = () => {
  setTurn((current) => current + 1);

  setCurrentCardIndex((current) => current + 1);
};

const applyStatusEffect = (
  effects: Partial<RegionStatus>
) => {
  setRegionStatus((current) => ({
    vitality: Math.min(
      100,
      Math.max(0, current.vitality + (effects.vitality ?? 0))
    ),
    livability: Math.min(
      100,
      Math.max(0, current.livability + (effects.livability ?? 0))
    ),
    environment: Math.min(
      100,
      Math.max(0, current.environment + (effects.environment ?? 0))
    ),
    connection: Math.min(
      100,
      Math.max(0, current.connection + (effects.connection ?? 0))
    ),
  }));
};

useEffect(() => {
  if (!loaded) return;

  const saved = localStorage.getItem(STORAGE_KEY);

  const data = saved
    ? JSON.parse(saved)
    : {};

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...data,
      game: {
        turn,
        currentCardIndex,
        regionStatus,
      },
    })
  );
}, [
  turn,
  currentCardIndex,
  regionStatus,
  loaded,
]);  
const isFinished = turn > maxTurns;

  return {
  turn,
  maxTurns,
  regionStatus,
  setRegionStatus,
  currentCardIndex,
  nextTurn,
  applyStatusEffect,
  isFinished,
};
}