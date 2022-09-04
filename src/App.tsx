import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import Bookmarked from "./pages/Bookmarked";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <SearchHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
