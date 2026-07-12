"use client";

import { IdeaCard } from "@/types/game";

type Props = {
  ideas: IdeaCard[];
  onSelect: (
    idea: IdeaCard
  ) => void;
};

export default function IdeaSelector({
  ideas,
  onSelect,
}: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">
        実行するアイデアを選択
      </h2>

      {ideas.map((idea) => (
        <button
          key={idea.id}
          className="w-full rounded-lg border p-4 text-left"
          onClick={() => onSelect(idea)}
        >
          <h3 className="font-semibold">
            {idea.title}
          </h3>

          <p className="mt-2 text-sm">
            {idea.content}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            効果：
            {Object.entries(
              idea.statusEffects
            )
              .map(
                ([key, value]) =>
                  `${key} ${value > 0 ? "+" : ""}${value}`
              )
              .join(" / ")}
          </p>
        </button>
      ))}
    </section>
  );
}