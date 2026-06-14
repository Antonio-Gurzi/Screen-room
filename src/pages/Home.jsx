import { useEffect, useState } from "react";
import { requests } from "../services/tmdb";
import MovieRow from "../components/MovieRow";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
//   const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    fetch(requests.trending)
      .then((res) => res.json())
      .then((data) => setTrending(data.results));

    fetch(requests.popular)
      .then((res) => res.json())
      .then((data) => setPopular(data.results));

    fetch(requests.topRated)
      .then((res) => res.json())
      .then((data) => setTopRated(data.results));
      
  }, []);

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navbar />
      <Hero />

      <MovieRow title="Trend del momento" movies={trending} />
      <MovieRow title="Film più popolari" movies={popular} />
      <MovieRow title="I più votati" movies={topRated} />
    </div>
  );
}

export default Home;
