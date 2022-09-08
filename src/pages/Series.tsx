import React from "react";
import Grid from "../components/Grid/Grid";

function Series(props: any) {
  interface SeriesProps {
    query: string;
    props: any;
  }

  const seriesProperties: SeriesProps = {
    query: "/series",
    props: props,
  };
  return (
    <>
      <h2 className="home__title">Series</h2>
      <Grid {...seriesProperties} />
    </>
  );
}

export default Series;
