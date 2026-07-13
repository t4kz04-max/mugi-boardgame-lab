type Props = {
  turn: number;
  maxTurns: number;
};

export default function TurnDisplay({
  turn,
  maxTurns,
}: Props) {
  return (
    <section className="rounded-xl border shadow-sm">
      <div className="rounded-t-xl border-b bg-gray-50 px-4 py-3">
  <h2 className="text-lg font-semibold">
    🎲 ターン
  </h2>
</div>

      <div className="space-y-3 px-4 py-5">
  <p className="text-center text-3xl font-bold">
    {turn}
    <span className="mx-2 text-gray-400">/</span>
    {maxTurns}
  </p>

  <p className="text-center text-sm text-gray-600">
    全 {maxTurns} ターン中の {turn} ターン目です
  </p>
</div>
    </section>
  );
}