function CastList({ credits }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cast principale</h2>

      {/* scroll orizzontale stile Netflix */}
      <div className="flex gap-4 overflow-x-auto pb-4">

        {credits.slice(0, 8).map((actor) => (
          <div key={actor.id} className="min-w-30 text-center">

            {/* avatar attore */}
            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-800 overflow-hidden">
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  className="w-full h-full object-cover"
                  alt={actor.name}
                />
              )}
            </div>

            {/* nome attore */}
            <p className="text-sm mt-2 text-white">{actor.name}</p>

            {/* personaggio */}
            <p className="text-xs text-gray-400">{actor.character}</p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default CastList;