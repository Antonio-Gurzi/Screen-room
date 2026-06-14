import { Link } from "react-router-dom";

function SimilarMovies({ movies }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Film simili</h2>

      {/* scroll orizzontale stile Netflix */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.slice(0, 7).map((movie) => (
          <div key={movie.id} className="min-w-35">
            {/* poster */}
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                className="
              
                rounded-lg
                hover:scale-105
                transition
                cursor-pointer
              "
                alt={movie.title}
              />

              {/* titolo */}
              <p className="text-sm mt-2 text-gray-300">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarMovies;
