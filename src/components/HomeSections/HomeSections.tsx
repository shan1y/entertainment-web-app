import React from "react";

function HomeSections() {
  return (
    <>
      <section className="home">
        <h2 className="home__title">Trending</h2>
        <div className="home__container home__container--trending"></div>
      </section>
      <section className="home">
        <h2 className="home__title">Recommended for you</h2>
        <div className="home__container home__container--trending"></div>
      </section>
    </>
  );
}

export default HomeSections;
