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
    <div className="space-y-2">
      <Label htmlFor={`player-${playerNumber}`}>
        プレイヤー{playerNumber}
      </Label>

      <Input
        id={`player-${playerNumber}`}
        value={value}
        maxLength={20}
        onChange={(event) => onChange(event.target.value)}
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
      />

      {error && (
        <p className="text-sm text-red-500">
          プレイヤー名を入力してください
        </p>
      )}
    </div>
  );
}