import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import Bookmarked from "./pages/Bookmarked";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  interface headerProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  }

  const headerProperties: headerProps = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
  };

  interface appProps {
    searchTerm: string;
  }

  const appProperties: appProps = {
    searchTerm: searchTerm,
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <div className="app__main">
          <SearchHeader {...headerProperties} />
          <Routes>
            <Route path="/" element={<Home {...appProperties} />} />
            <Route path="/movies" element={<Movies {...appProperties} />} />
            <Route path="/series" element={<Series {...appProperties} />} />
            <Route
              path="/bookmarked"
              element={<Bookmarked {...appProperties} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
