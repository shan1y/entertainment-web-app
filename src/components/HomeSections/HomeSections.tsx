import React from "react";
import "./HomeSections.scss";
import videos from "../../assets/data/data.json";
import beyond from "../../assets/thumbnails/beyond-earth/regular/large.jpg";
import gear from "../../assets/thumbnails/bottom-gear/regular/large.jpg";
import cities from "../../assets/thumbnails/undiscovered-cities/regular/large.jpg";
import ninetees from "../../assets/thumbnails/1998/regular/large.jpg";
import moon from "../../assets/thumbnails/dark-side-of-the-moon/regular/large.jpg";
import Grid from "../Grid/Grid";

interface Video {
  title: string;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

let thumbnails: string[] = [beyond, gear, cities, ninetees, moon];
let trending: Video[] = [];
videos.forEach((video) => {
  if (video.isTrending) {
    trending.push(video);
  }
});

function HomeSections() {
  return (
    <>
      <section className="home">
        <h2 className="home__title">Trending</h2>
        <div className="contain">
          <div className="row">
            <div className="row__inner">
              {trending.map((video, index) => {
                return (
                  <div key={index} className="tile">
                    <div className="tile__media">
                      <img
                        className="tile__img"
                        src={thumbnails[index]}
                        alt=""
                      />
                    </div>
                    <div className="tile__details">
                      <div className="tile__title">{video.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="home">
        <h2 className="home__title">Recommended for you</h2>
        <Grid />
      </section>
    </>
  );
}

export default HomeSections;
