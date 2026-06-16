function MovieCardSkeleton() {
  return (
    <div className="w-40">
      {/* poster placeholder */}
      <div className="w-full h-60 bg-zinc-800 rounded-lg animate-pulse" />

      {/* titolo placeholder (opzionale ma consigliato) */}
      <div className="mt-2 h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
    </div>
  );
}

export default MovieCardSkeleton;