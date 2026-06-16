import { useRef } from "react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "../skeletonComponents/MovieCardSkeleton";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  // scroll verso sinistra
  const scrollLeft = () => {
    rowRef.current.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  // scroll verso destra
  const scrollRight = () => {
    rowRef.current.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-6 mt-6 relative group">
      {/* titolo sezione */}
      <h2 className="text-xl font-bold mb-3 text-gray-100">{title}</h2>

      {/* FRECCIA SINISTRA */}
      <button
        onClick={scrollLeft}
        className="
    absolute left-0 top-0 bottom-0
    w-12
    flex items-center justify-center
    text-white
     from-black/70 to-transparent
    opacity-0 group-hover:opacity-100
    transition
  "
      >
        <span className="text-3xl hover:scale-200 transition">‹</span>
      </button>

      {/* ROW SCROLLABILE */}
      <div
        ref={rowRef}
        className="
          flex gap-4 
          overflow-x-auto 
          scrollbar-hide 
          py-3
        "
      >
        {movies?.length > 0
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : Array(6)
              .fill(0)
              .map((_, i) => <MovieCardSkeleton key={i} />)}
      </div>

      {/* FRECCIA DESTRA */}
      <button
        onClick={scrollRight}
        className="
    absolute right-0 top-0 bottom-0
    w-12
    flex items-center justify-center
    text-white
    from-black/70 to-transparent
    opacity-0 group-hover:opacity-100
    transition
  "
      >
        <span className="text-3xl hover:scale-200 transition">›</span>
      </button>
    </div>
  );
}

export default MovieRow;
