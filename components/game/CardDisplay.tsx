import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Card as GameCard,
  ChallengeCard,
  IdeaCard,
  EventCard,
  InspirationCard,
} from "@/types/game";

type Props = {
  card: GameCard;
};

const CARD_TYPE_LABELS = {
  challenge: "課題カード",
  idea: "アイデアカード",
  event: "未来イベントカード",
  inspiration: "発想カード",
};

export default function CardDisplay({ card }: Props) {
  return (
    <Card className="rounded-xl border-2 shadow-md">
      <CardHeader className="space-y-3 border-b bg-gray-50">
        <p className="inline-block w-fit rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
          {CARD_TYPE_LABELS[card.type]}
        </p>

        <CardTitle className="text-2xl leading-tight">
          {card.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <p>{card.content}</p>

        {card.type === "challenge" && (
  <>
    <div className="rounded-lg border bg-blue-50 p-4">
      <h3 className="mb-2 text-sm font-semibold text-blue-700">
        キーワード
      </h3>

      <p>{(card as ChallengeCard).tags.join("・")}</p>
    </div>
  </>
)}

        {card.type === "idea" && (
          <>
            <div className="rounded-lg border bg-blue-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-blue-700">
    キーワード
  </h3>

  <p>
    {(card as IdeaCard).tags.join("・")}
  </p>
</div>
          </>
        )}

        {card.type === "event" && (
  <>
    <div className="rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-600">
        地域への影響
      </h3>

      <p>{(card as EventCard).impact}</p>
    </div>

    <div className="rounded-lg border bg-blue-50 p-4">
      <h3 className="mb-2 text-sm font-semibold text-blue-700">
        キーワード
      </h3>

      <p>{(card as EventCard).tags.join("・")}</p>
    </div>
  </>
)}

        {card.type === "inspiration" && (
          <>
            <div>
              <h3 className="font-semibold">
                地域
              </h3>
              <p>{(card as InspirationCard).region}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                取り組み
              </h3>
              <p>{(card as InspirationCard).initiative}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                学べること
              </h3>
              <p>{(card as InspirationCard).learning}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                牟岐町への応用
              </h3>
              <p>{(card as InspirationCard).application}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}