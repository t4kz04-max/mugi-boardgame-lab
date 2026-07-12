import {
  ChallengeCard,
  IdeaCard,
  EventCard,
  InspirationCard,
} from "@/types/game";

import challengeCards from "@/data/challengeCards.json";
import ideaCards from "@/data/ideaCards.json";
import eventCards from "@/data/eventCards.json";
import inspirationCards from "@/data/inspirationCards.json";

export const cards = {
  challenge: challengeCards as ChallengeCard[],
  idea: ideaCards as IdeaCard[],
  event: eventCards as EventCard[],
  inspiration: inspirationCards as InspirationCard[],
};