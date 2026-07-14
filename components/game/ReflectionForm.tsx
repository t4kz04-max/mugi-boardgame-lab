"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "mugi-boardgame-lab";

export default function ReflectionForm() {
  const [reflection, setReflection] = useState({
    memorableCard: "",
    interestingOpinion: "",
    realTown: "",
    personalAction: "",
  });

  const saveReflection = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    const data = saved
      ? JSON.parse(saved)
      : {};

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...data,
        reflection,
      })
    );
  };

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      <div className="border-b bg-amber-50 px-5 py-4">
  <h2 className="text-xl font-bold text-amber-800">
    📝 振り返り
  </h2>

  <p className="mt-1 text-sm text-amber-700">
    今回のゲームを振り返って感じたことを書いてみましょう。
  </p>
</div>

      <div className="space-y-5 px-5 py-5">
        <label className="block text-sm font-semibold text-gray-700">
          印象に残ったカード
        </label>
        <textarea
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 leading-6 focus:border-blue-500 focus:outline-none"
          value={reflection.memorableCard}
          onChange={(e) =>
            setReflection({
              ...reflection,
              memorableCard: e.target.value,
            })
          }
        />
      

      
        <label className="block text-sm font-semibold text-gray-700">
          面白かった意見
        </label>
        <textarea
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 leading-6 focus:border-blue-500 focus:outline-none"
          value={reflection.interestingOpinion}
          onChange={(e) =>
            setReflection({
              ...reflection,
              interestingOpinion: e.target.value,
            })
          }
        />
      

      
        <label className="block text-sm font-semibold text-gray-700">
          実際の牟岐町ではどうだろう
        </label>
        <textarea
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 leading-6 focus:border-blue-500 focus:outline-none"
          value={reflection.realTown}
          onChange={(e) =>
            setReflection({
              ...reflection,
              realTown: e.target.value,
            })
          }
        />
      

      
        <label className="block text-sm font-semibold text-gray-700">
          自分なら何をしてみたいか
        </label>
        <textarea
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 leading-6 focus:border-blue-500 focus:outline-none"
          value={reflection.personalAction}
          onChange={(e) =>
            setReflection({
              ...reflection,
              personalAction: e.target.value,
            })
          }
        />
      </div>

      <Button
  className="mx-5 mb-5 h-12 w-[calc(100%-2.5rem)] text-base font-semibold"
  onClick={saveReflection}
>
        振り返りを保存
      </Button>
    </section>
  );
}