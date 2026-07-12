import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            牟岐ボードゲームラボ
          </h1>

          <p className="text-base text-muted-foreground">
            地域について自然に対話するための
            <br />
            協力型ボードゲーム
          </p>
        </div>

        <Button size="lg">
          ゲームを始める
        </Button>
      </div>
    </main>
  );
}