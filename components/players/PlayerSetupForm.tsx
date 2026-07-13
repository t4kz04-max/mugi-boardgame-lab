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
  className="inline-flex w-fit items-center rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-gray-100"
>
  ← ホームへ戻る
</Link>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
  プレイヤー設定
</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
  <div>
    <Label className="text-base font-semibold">
      プレイヤー人数
    </Label>

    <p className="mt-1 text-sm text-gray-600">
      今回ゲームに参加する人数を選択してください。
    </p>
  </div>

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

          <section className="space-y-4 rounded-lg bg-gray-50 p-4">
  <div>
    <h3 className="text-base font-semibold">
      プレイヤー名
    </h3>

    <p className="mt-1 text-sm text-gray-600">
      各プレイヤーの名前を入力してください。
    </p>
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
</section>

          <Button
  className="mt-2 h-12 w-full text-base font-semibold"
  onClick={startGame}
>
  ゲームを始める →
</Button>
        </CardContent>
      </Card>
    </div>
  );
}