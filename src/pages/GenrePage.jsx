import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function GenrePage() {
  const { id } = useParams();

  // ================= STATE =================
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreName, setGenreName] = useState("");

  // ================= FETCH FILM PER GENERE =================
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a9a87104020ae24c70f9e7ba635d0ed8&with_genres=${id}`,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  }, [id]);

  // ================= FETCH LISTA GENERI =================
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT",
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch(() => setGenres([]));
  }, []);

  // ================= MATCH ID -> NOME GENERE =================
  useEffect(() => {
    if (!genres.length) return;

    const foundGenre = genres.find((g) => g.id === Number(id));

    if (foundGenre) {
      setGenreName(foundGenre.name);
    } else {
      setGenreName("");
    }
  }, [genres, id]);

  return (
    <div className="px-6 py-10">
      {/* ================= TITLE ================= */}
      <h1 className="text-3xl font-bold mb-8">
        Film per genere:{" "}
        <span className="text-blue-500">{genreName || "Caricamento..."}</span>
      </h1>

      {/* ================= GRID FILM ================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            {/* LINK DETTAGLIO FILM */}
            <Link to={`/movie/${movie.id}`}>
              {/* POSTER */}
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

export default GenrePage;
