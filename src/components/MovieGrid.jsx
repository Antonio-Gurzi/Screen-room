import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-8 gap-2">
      {!movies || movies.length === 0 ? (
        <p className="text-gray-400 col-span-full text-center">
          Nessun film trovato
        </p>
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
}

export default MovieGrid;