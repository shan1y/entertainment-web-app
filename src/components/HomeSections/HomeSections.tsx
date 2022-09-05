import { useEffect, useState } from "react";
import "./HomeSections.scss";
import Grid from "../Grid/Grid";
import axios from "axios";

let dataRow: {
  category: string;
  isBookmarked: string;
  isTrending: string;
  rating: string;
  thumbnail: string;
  title: string;
  year: number;
};

interface HomeSectionsProps {
  query: string;
}

const homeProperties: HomeSectionsProps = {
  query: "/recommended",
};

function HomeSections() {
  const [data, setData] = useState(null);
  const [trendingCarousel, setTrendingCarousel] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/trending")
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .then((videoData) => {
        let trendingVids: string[] = [];
        videoData.forEach((row: typeof dataRow) => {
          let parsed = JSON.parse(row.thumbnail);
          trendingVids.push(parsed.regular.large.substring(19));
        });
        setTrendingCarousel(trendingVids);
      });
  }, []);

  if (!data && trendingCarousel.length === 0) {
    return <p></p>;
  }

  return (
    <>
      <section className="home">
        <h2 className="home__title">Trending</h2>
        <div className="contain">
          <div className="row">
            <div className="row__inner">
              {trendingCarousel.map((video, index) => {
                return (
                  <div key={index} className="tile">
                    <div className="tile__media">
                      <img
                        className="tile__img"
                        src={"http://localhost:8080/".concat(`${video}`)}
                        alt=""
                      />
                    </div>
                    <div className="tile__details">
                      <div className="tile__title">{"title"}</div>
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
        <Grid {...homeProperties} />
      </section>
    </>
  );
}

export default HomeSections;
