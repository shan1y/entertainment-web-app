import React from "react";
import Grid from "../components/Grid/Grid";

function Bookmarked(props: any) {
  interface bookmarkedProps {
    query: string;
    props: any;
  }

  const bookmarkedProperties: bookmarkedProps = {
    query: "/bookmarked",
    props: props,
  };

  return (
    <>
      <h2 className="home__title">Bookmarked</h2>
      <Grid {...bookmarkedProperties} />
    </>
  );
}

export default Bookmarked;
