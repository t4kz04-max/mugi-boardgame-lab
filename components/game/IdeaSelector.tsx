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
    <section className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
      <div>
  <h2 className="text-xl font-bold">
    💡 アイデアを選択
  </h2>

  <p className="mt-1 text-sm text-gray-600">
    プレイヤーで話し合い、今回実行する取り組みを1つ選択してください。
  </p>
</div>

      {ideas.map((idea) => (
        <button
          key={idea.id}
          className="w-full rounded-xl border bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-md"
          onClick={() => onSelect(idea)}
        >
          <h3 className="text-lg font-bold">
            {idea.title}
          </h3>

          <p className="mt-3 leading-7 text-gray-700">
            {idea.content}
          </p>

          <div className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
  <span className="font-semibold">効果：</span>
  {" "}
  {Object.entries(idea.statusEffects)
    .map(
      ([key, value]) =>
        `${key} ${value > 0 ? "+" : ""}${value}`
    )
    .join(" / ")}
</div>
        </button>
      ))}
    </section>
  );
}