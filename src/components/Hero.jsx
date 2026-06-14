import { useEffect, useState } from "react";
import { requests } from "../services/tmdb";
import { Link } from "react-router-dom";

function Hero() {
  const [movie, setMovie] = useState(null);
  const [fade, setFade] = useState(true);

  // ================= TRAILER STATE =================
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState(false);

  // ================= TRAILER HANDLER =================
  const handlePlay = async (movieId) => {
    try {
      setTrailerError(false);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT`,
      );

      const data = await res.json();

      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube",
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        setTrailerError(true);
        setShowTrailer(true);
      }
    } catch (error) {
      console.error("Errore trailer:", error);
      setTrailerError(true);
      setShowTrailer(true);
    }
  };

  // ================= RANDOM MOVIE =================
  const changeMovie = (movies) => {
    setFade(false);

    setTimeout(() => {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      setMovie(randomMovie);
      setFade(true);
    }, 400);
  };

  useEffect(() => {
    let interval;

    fetch(requests.trending)
      .then((res) => res.json())
      .then((data) => {
        const movies = data.results;

        changeMovie(movies);

        interval = setInterval(() => {
          changeMovie(movies);
        }, 10000);
      });

    return () => clearInterval(interval);
  }, []);

  if (!movie) return null;

  return (
    <header className="relative h-[60vh] flex items-end p-10 text-white overflow-hidden">
      {/* BACKGROUND */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center transition-opacity duration-500
          ${fade ? "opacity-100" : "opacity-0"}
        `}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ================= TRAILER OVERLAY ================= */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => {
              setShowTrailer(false);
              setTrailerKey(null);
              setTrailerError(false);
            }}
          >
            ✕
          </button>

          {/* TRAILER OK */}
          {trailerKey && !trailerError && (
            <iframe
              className="w-[80%] h-[70%] rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            />
          )}

          {/* FALLBACK */}
          {trailerError && (
            <div className="text-center text-white space-y-3">
              <p className="text-xl font-semibold">
                Trailer non disponibile 😕
              </p>
              <p className="text-gray-400 text-sm">
                Questo contenuto non ha un trailer su YouTube.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CONTENUTO */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

        <p className="text-sm text-gray-200 line-clamp-3">{movie.overview}</p>

        <div className="flex gap-4 mt-5">
          {/* PLAY */}
          <button
            onClick={() => handlePlay(movie.id)}
            className="
              flex items-center gap-2
              bg-blue-600 text-white
              px-6 py-2.5 rounded-md
              font-semibold
              hover:bg-blue-700
              active:scale-95
              transition
              shadow-md shadow-blue-600/20
            "
          >
            ▶ Trailer
          </button>

          {/* MORE INFO */}
          <Link to={`/movie/${movie.id}`}>
            <button
              className="
              bg-white/10 text-white
              backdrop-blur-md
              border border-white/20
              px-6 py-2.5 rounded-md
              font-semibold
              hover:bg-white/20
              active:scale-95
              transition
            "
            >
              ℹ Info
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Hero;
