import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetails.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import GenrePage from "./pages/GenrePage.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/genre/:id" element={<GenrePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
