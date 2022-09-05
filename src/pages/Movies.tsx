import React from "react";
import Grid from "../components/Grid/Grid";

function Movies() {
  interface MovieProps {
    query: string;
  }

  const movieProperties: MovieProps = {
    query: "/movie",
  };
  return (
    <>
      <h2 className="home__title">Movies</h2>
      <Grid {...movieProperties} />
    </>
  );
}

export default Movies;
