import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  // SEARCH
  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.target.elements.search.value;

    if (!query.trim()) return;

    navigate(`/search?query=${query}`);
  };

  // GENRES STATE
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=a9a87104020ae24c70f9e7ba635d0ed8&language=it-IT",
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 text-gray-100 border-b border-white/10">
      {/* LOGO */}
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-blue-600">Screen</span>
          <span className="text-gray-400">Room</span>
        </h1>
      </Link>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          name="search"
          type="text"
          placeholder="Cerca un film..."
          className="bg-zinc-800 text-white px-3 py-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
        />
      </form>

      {/* GENRES SELECT */}
      <select
        className="bg-zinc-800 text-white px-3 py-1.5 rounded-md text-sm"
        onChange={(e) => {
          const genreId = e.target.value;
          // se seleziona tutti i generi mi riporta nella home
          if (!genreId) {
            navigate("/");
            return;
          }

          navigate(`/genre/${genreId}`);
        }}
      >
        <option value="">Tutti i generi</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Navbar;
