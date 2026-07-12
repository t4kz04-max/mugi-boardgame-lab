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
    <Card>
      <CardHeader>
        <p className="text-sm text-muted-foreground">
          {CARD_TYPE_LABELS[card.type]}
        </p>

        <CardTitle>
          {card.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>{card.content}</p>

        {card.type === "challenge" && (
          <>
            <div>
              <h3 className="font-semibold">
                現状
              </h3>
              <p>{(card as ChallengeCard).currentSituation}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                背景
              </h3>
              <p>{(card as ChallengeCard).background}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                関係者
              </h3>
              <p>{(card as ChallengeCard).stakeholders.join("、")}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                考えるポイント
              </h3>
              <ul className="list-disc pl-5">
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
            <div>
              <h3 className="font-semibold">
                メリット
              </h3>
              <p>{(card as IdeaCard).benefits}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                注意点
              </h3>
              <p>{(card as IdeaCard).notes}</p>
            </div>
          </>
        )}

        {card.type === "event" && (
          <>
            <div>
              <h3 className="font-semibold">
                地域への影響
              </h3>
              <p>{(card as EventCard).impact}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                話し合うテーマ
              </h3>
              <p>{(card as EventCard).discussionTheme}</p>
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