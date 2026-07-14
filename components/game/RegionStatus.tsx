import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RegionStatus as RegionStatusType } from "@/types/game";



type Props = {
  status: RegionStatusType;
};

const STATUS_LABELS = [
  {
    key: "vitality",
    label: "地域活力",
  },
  {
    key: "livability",
    label: "暮らしやすさ",
  },
  {
    key: "environment",
    label: "自然環境",
  },
  {
    key: "connection",
    label: "地域のつながり",
  },
] as const;

export default function RegionStatus({
  status,
}: Props) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="border-b bg-gray-50">
        <CardTitle className="text-xl">
  🏘️ 町の状態
</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {STATUS_LABELS.map((item) => (
          <div
  key={item.key}
  className="rounded-lg border bg-gray-50 p-4"
>
  <div className="mb-2 flex items-center justify-between">
    <span className="font-medium">
      {item.label}
    </span>

    <span className="text-lg font-bold">
      {status[item.key]}
    </span>
  </div>

  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
    <div
      className="h-full rounded-full bg-green-500 transition-all duration-500"
      style={{
        width: `${status[item.key]}%`,
      }}
    />
  </div>
</div>
        ))}
      </CardContent>
    </Card>
  );
}