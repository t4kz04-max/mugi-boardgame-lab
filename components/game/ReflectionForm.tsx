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
    <section className="rounded-lg border p-4 space-y-4">
      <h2 className="text-lg font-semibold">
        振り返り
      </h2>

      <div>
        <label className="block text-sm font-medium">
          印象に残ったカード
        </label>
        <textarea
          className="mt-1 w-full rounded-md border p-2"
          value={reflection.memorableCard}
          onChange={(e) =>
            setReflection({
              ...reflection,
              memorableCard: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          面白かった意見
        </label>
        <textarea
          className="mt-1 w-full rounded-md border p-2"
          value={reflection.interestingOpinion}
          onChange={(e) =>
            setReflection({
              ...reflection,
              interestingOpinion: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          実際の牟岐町ではどうだろう
        </label>
        <textarea
          className="mt-1 w-full rounded-md border p-2"
          value={reflection.realTown}
          onChange={(e) =>
            setReflection({
              ...reflection,
              realTown: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          自分なら何をしてみたいか
        </label>
        <textarea
          className="mt-1 w-full rounded-md border p-2"
          value={reflection.personalAction}
          onChange={(e) =>
            setReflection({
              ...reflection,
              personalAction: e.target.value,
            })
          }
        />
      </div>

      <Button onClick={saveReflection}>
        振り返りを保存
      </Button>
    </section>
  );
}