import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlayerNameInputProps {
  playerNumber: number;
  value: string;
  error: boolean;
  onChange: (value: string) => void;
}

export default function PlayerNameInput({
  playerNumber,
  value,
  error,
  onChange,
}: PlayerNameInputProps) {
  return (
    <div className="space-y-3 rounded-lg border bg-white p-4">
      <Label
  htmlFor={`player-${playerNumber}`}
  className="text-base font-semibold"
>
  プレイヤー {playerNumber}
</Label>

      <Input
        id={`player-${playerNumber}`}
        placeholder={`プレイヤー${playerNumber}の名前`}
        value={value}
        maxLength={20}
        onChange={(event) => onChange(event.target.value)}
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
      />

      {error && (
        <p className="text-sm font-medium text-red-600">
          プレイヤー名を入力してください
        </p>
      )}
    </div>
  );
}