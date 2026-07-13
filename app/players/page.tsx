import PlayerSetupForm from "@/components/players/PlayerSetupForm";

export default function PlayersPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          プレイヤー設定
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          参加するプレイヤーを登録してください
        </p>
      </header>

      <PlayerSetupForm />
    </main>
  );
}