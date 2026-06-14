import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClockIcon from "../asset/ClockIcon ";
import CastList from "../components/CastList";
import SimilarMovies from "../components/SimilarMovies";
import Navbar from "../components/Navbar";

function MovieDetail() {
  const { id } = useParams();

  // ================= STATE PRINCIPALE =================
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [similar, setSimilar] = useState([]);

  // ================= TRAILER STATE =================
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState(false);

  // ================= FETCH DATI FILM =================
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT`,
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT`,
    )
      .then((res) => res.json())
      .then((data) => setCredits(data.cast));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT`,
    )
      .then((res) => res.json())
      .then((data) => setSimilar(data.results));
  }, [id]);

  // ================= LOADING =================
  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ================= TRAILER HANDLER =================
  const handlePlay = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT`,
      );

      const data = await res.json();

      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube",
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        // caso fallback
        setTrailerError(true);
        setShowTrailer(true);
      }
    } catch (error) {
      console.error("Errore trailer:", error);
      setTrailerError(true);
      setShowTrailer(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      {/* ================= HERO ================= */}
      <div className="relative h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-end p-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>

          {movie.tagline && (
            <p className="text-blue-300 italic text-sm md:text-base max-w-2xl">
              {movie.tagline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
            <p className="flex items-center gap-1">
              ⭐{" "}
              <span className="text-white font-semibold">
                {Number(movie.vote_average).toFixed(1)}
              </span>
            </p>

            <p>
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("it-IT")
                : "Data non disponibile"}
            </p>

            <p className="flex items-center gap-1.5 text-gray-400 text-sm">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>
                Durata: <span className="text-white font-medium">2h 15m</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= TRAILER OVERLAY (GLOBAL FIX) ================= */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          {/* chiudi */}
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

          {/* CASO 1: TRAILER OK */}
          {trailerKey && !trailerError && (
            <iframe
              className="w-[80%] h-[70%] rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            />
          )}

          {/* CASO 2: FALLBACK */}
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

      {/* ================= CONTENUTO ================= */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* DESCRIZIONE + BOTTONI */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <p className="text-gray-300 text-center leading-relaxed text-lg">
              {movie.overview}
            </p>

            <div className="flex gap-4 pt-4 justify-center">
              <button
                onClick={handlePlay}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-md font-semibold transition active:scale-95 cursor-pointer"
              >
                ▶ Trailer
              </button>
            </div>
          </div>
        </div>

        {/* CAST */}
        <CastList credits={credits} />

        {/* SIMILI */}
        <SimilarMovies movies={similar} />
      </div>
    </div>
  );
}

export default MovieDetail;
