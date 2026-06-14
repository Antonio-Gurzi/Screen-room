const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const requests = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=it-IT`,
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=it-IT`,
};