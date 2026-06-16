function HeroSkeleton() {
  return (
    <header className="relative h-[60vh] flex items-end p-10 bg-zinc-900 animate-pulse">
      <div className="space-y-4 max-w-2xl w-full">
        <div className="h-10 w-2/3 bg-zinc-700 rounded" />
        <div className="h-4 w-full bg-zinc-700 rounded" />
        <div className="h-4 w-5/6 bg-zinc-700 rounded" />

        <div className="flex gap-4 mt-5">
          <div className="h-10 w-32 bg-zinc-700 rounded" />
          <div className="h-10 w-32 bg-zinc-700 rounded" />
        </div>
      </div>
    </header>
  );
}

export default HeroSkeleton;
