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
    <Card>
      <CardHeader>
        <CardTitle>
          町の状態
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {STATUS_LABELS.map((item) => (
          <div
            key={item.key}
            className="flex justify-between"
          >
            <span>
              {item.label}
            </span>

            <span>
              {status[item.key]}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}