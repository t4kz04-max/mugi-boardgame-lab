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
            <div className="rounded-lg border bg-gray-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-gray-600">
    現状
  </h3>

  <p className="leading-7">
    {(card as ChallengeCard).currentSituation}
  </p>
</div>

            <div className="rounded-lg border bg-gray-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-gray-600">
    背景
  </h3>

  <p className="leading-7">
    {(card as ChallengeCard).background}
  </p>
</div>

            <div className="rounded-lg border bg-gray-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-gray-600">
    関係者
  </h3>

  <p className="leading-7">
    {(card as ChallengeCard).stakeholders.join("、")}
  </p>
</div>

            <div className="rounded-lg border bg-blue-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-blue-700">
    考えるポイント
  </h3>

  <ul className="list-disc space-y-2 pl-5 leading-7">
                {(card as ChallengeCard).points.map((point) => (
                  <li key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {card.type === "idea" && (
          <>
            <div className="rounded-lg border bg-green-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-green-700">
    メリット
  </h3>

  <p className="leading-7">
    {(card as IdeaCard).benefits}
  </p>
</div>

            <div className="rounded-lg border bg-amber-50 p-4">
  <h3 className="mb-2 text-sm font-semibold text-amber-700">
    注意点
  </h3>

  <p className="leading-7">
    {(card as IdeaCard).notes}
  </p>
</div>
          </>
        )}

        {card.type === "event" && (
          <>
            <div className="rounded-lg border bg-gray-50 p-4">
  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
    地域への影響
  </h3>

  <p className="leading-7">
    {(card as EventCard).impact}
  </p>
</div>

            <div className="rounded-lg border bg-blue-50 p-4">
  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
    話し合うテーマ
  </h3>

  <p className="leading-7">
    {(card as EventCard).discussionTheme}
  </p>
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