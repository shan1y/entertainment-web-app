import React from "react";
import Grid from "../components/Grid/Grid";

function Series() {
  interface SeriesProps {
    query: string;
  }

  const seriesProperties: SeriesProps = {
    query: "/series",
  };
  return (
    <>
      <h2 className="home__title">Series</h2>
      <Grid {...seriesProperties} />
    </>
  );
}

export default Series;
