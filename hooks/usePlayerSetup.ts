"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Player, PlayerSettings } from "@/types/player";

const STORAGE_KEY = "mugi-boardgame-lab";

const createPlayers = (count: number): Player[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: "",
  }));

export function usePlayerSetup() {
  const router = useRouter();

  const [playerCount, setPlayerCount] = useState<number>(3);
  const [players, setPlayers] = useState<Player[]>(createPlayers(3));
  const [errors, setErrors] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
  const loadPlayers = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const data: PlayerSettings = JSON.parse(saved);

      setPlayerCount(data.playerCount);
      setPlayers(data.players);
      setErrors(new Array(data.playerCount).fill(false));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  loadPlayers();
}, []);

  useEffect(() => {
    const data: PlayerSettings = {
      playerCount,
      players,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [playerCount, players]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);

    setPlayers((prev) => {
      if (count > prev.length) {
        const additional = Array.from(
          { length: count - prev.length },
          (_, index) => ({
            id: prev.length + index + 1,
            name: "",
          })
        );

        return [...prev, ...additional];
      }

      return prev.slice(0, count);
    });

    setErrors(new Array(count).fill(false));
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    setPlayers((prev) =>
      prev.map((player, i) =>
        i === index
          ? {
              ...player,
              name: value,
            }
          : player
      )
    );
  };

  const startGame = () => {
    const nextErrors = players.map(
      (player) => player.name.trim().length === 0
    );

    setErrors(nextErrors);

    if (nextErrors.some(Boolean)) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        playerCount,
        players,
      })
    );

    router.push("/game");
  };

  return {
    playerCount,
    players,
    errors,
    handlePlayerCountChange,
    handlePlayerNameChange,
    startGame,
  };
}