"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import PlayerNameInput from "./PlayerNameInput";
import { usePlayerSetup } from "@/hooks/usePlayerSetup";

export default function PlayerSetupForm() {
  const {
    playerCount,
    players,
    errors,
    handlePlayerCountChange,
    handlePlayerNameChange,
    startGame,
  } = usePlayerSetup();

  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col gap-6 px-4 py-8">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← 戻る
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>プレイヤー設定</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>プレイヤー人数</Label>

            <Select
              value={String(playerCount)}
              onValueChange={(value) =>
                handlePlayerCountChange(Number(value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="3">3人</SelectItem>
                <SelectItem value="4">4人</SelectItem>
                <SelectItem value="5">5人</SelectItem>
                <SelectItem value="6">6人</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {players.map((player, index) => (
              <PlayerNameInput
                key={player.id}
                playerNumber={index + 1}
                value={player.name}
                error={errors[index]}
                onChange={(value) =>
                  handlePlayerNameChange(index, value)
                }
              />
            ))}
          </div>

          <Button
            className="w-full"
            onClick={startGame}
          >
            ゲームを始める
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}