import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    
    <Link to={`/movie/${movie.id}`}>
      <div className="w-40 cursor-pointer">
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg hover:scale-105 transition"
        />
      </div>
    </Link>
  );
}

export default MovieCard;
