import React from "react";
import Grid from "../components/Grid/Grid";

function Bookmarked() {
  interface bookmarkedProps {
    query: string;
  }

  const bookmarkedProperties: bookmarkedProps = {
    query: "/bookmarked",
  };

  return (
    <>
      <h2 className="home__title">Bookmarked</h2>
      <Grid {...bookmarkedProperties} />
    </>
  );
}

export default Bookmarked;
