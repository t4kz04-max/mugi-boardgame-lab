import {
  ChallengeCard,
  EventCard,
  IdeaCard,
} from "@/types/game";


/**
 * タグ一致数を計算する
 */
function calculateTagScore(
  sourceTags: string[],
  targetTags: string[]
) {
  return sourceTags.filter((tag) =>
    targetTags.includes(tag)
  ).length;
}


/**
 * イベントに関連するチャレンジを取得
 */
export function getRelatedChallenges(
  event: EventCard,
  challenges: ChallengeCard[],
  limit = 3
): ChallengeCard[] {

  return challenges
    .map((challenge) => ({
      card: challenge,
      score: calculateTagScore(
        event.tags,
        challenge.tags
      ),
    }))
    .filter(
      (item) => item.score > 0
    )
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, limit)
    .map(
      (item) => item.card
    );
}


/**
 * チャレンジに関連するアイデアを取得
 */
export function getRelatedIdeas(
  challenge: ChallengeCard,
  ideas: IdeaCard[],
  limit = 3
): IdeaCard[] {

  return ideas
    .map((idea) => ({
      card: idea,
      score: calculateTagScore(
        challenge.tags,
        idea.tags
      ),
    }))
    .filter(
      (item) => item.score > 0
    )
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, limit)
    .map(
      (item) => item.card
    );
}