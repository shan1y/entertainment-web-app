import React from "react";
import Grid from "../components/Grid/Grid";

function Movies(props: any) {
  interface MovieProps {
    query: string;
    props: any;
  }

  const movieProperties: MovieProps = {
    query: "/movie",
    props: props,
  };
  return (
    <>
      <h2 className="home__title">Movies</h2>
      <Grid {...movieProperties} />
    </>
  );
}

export default Movies;
