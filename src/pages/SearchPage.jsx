import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

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
    <div className="px-6 py-10">
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
      <MovieGrid movies={movies} />
    </div>
  );
}

export default SearchPage;
