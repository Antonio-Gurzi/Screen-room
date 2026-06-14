import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function SearchPage() {
  //leggiamo la query dall'URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  //stato risultati film
  const [movies, setMovies] = useState([]);

  //stato loading
  const [loading, setLoading] = useState(false);

  //ogni volta che cambia la query rifacciamo la ricerca
  useEffect(() => {
    // se non c'è query non facciamo nulla
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT&query=${query}`,
        );

        const data = await res.json();

        setMovies(data.results || []);
      } catch (error) {
        console.error("Errore nella ricerca:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <Navbar />
      {/* ================= HEADER ================= */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Risultati per: <span className="text-blue-500">{query || "..."}</span>
      </h1>

      {/* ================= LOADING ================= */}
      {loading && <p className="text-gray-400">Caricamento in corso...</p>}

      {/* ================= EMPTY STATE ================= */}
      {!loading && movies.length === 0 && query && (
        <p className="text-gray-400">Nessun risultato trovato per "{query}"</p>
      )}

      {/* ================= GRID RESULTS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            {/* POSTER */}
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="
                rounded-lg
                transition
                duration-300
                group-hover:scale-105
              "
                loading="lazy"
              />

              {/* TITOLO */}
              <p className="text-sm mt-2 text-gray-300 group-hover:text-white transition">
                {movie.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
