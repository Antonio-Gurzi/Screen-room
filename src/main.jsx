import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetails";
import SearchPage from "./pages/SearchPage";
import GenrePage from "./pages/GenrePage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/genre/:id" element={<GenrePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
