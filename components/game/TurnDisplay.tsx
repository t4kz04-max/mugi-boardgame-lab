type Props = {
  turn: number;
  maxTurns: number;
};

export default function TurnDisplay({
  turn,
  maxTurns,
}: Props) {
  return (
    <section className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">
        ターン
      </h2>

      <p className="mt-2 text-muted-foreground">
        {turn} / {maxTurns}
      </p>
    </section>
  );
}