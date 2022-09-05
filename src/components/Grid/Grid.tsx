import "./Grid.scss";
import icon from "../../assets/icons/icon-category-movie.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import play from "../../assets/icons/icon-play.svg";

let dataRow: {
  category: string;
  isBookmarked: string;
  isTrending: string;
  rating: string;
  thumbnail: string;
  title: string;
  year: number;
};

function Grid(props: any) {
  const [data, setData] = useState<typeof dataRow[]>([]);
  const [grid, setGrid] = useState<string[]>([]);
  const { query } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8080".concat(query))
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
        setGrid(trendingVids);
      });
  }, []);

  if (data.length === 0 && grid.length === 0) {
    return <p></p>;
  } else {
    return (
      <div className="movies">
        {data.map((video, index) => {
          return (
            <div key={index} className="movies__tile">
              <div className="movies__image-container">
                <img
                  className="movies__image"
                  src={"http://localhost:8080/".concat(`${grid[index]}`)}
                ></img>
                <div className="movies__tile-overlay overlay">
                  <div className="overlay__container">
                    <img className="overlay__icon" src={play} alt="play icon" />
                    <p className="overlay__text">Play</p>
                  </div>
                </div>
              </div>
              <div className="movies__bookmarked-circle"></div>
              <div
                className={"movies__bookmarked--".concat(
                  `${data[index].isBookmarked}`
                )}
              ></div>
              <div className="movies__info-container info-container">
                <div className="info-container--top">
                  <h4 className="info-container__text">{video.year}</h4>
                  <div className="info-container__movie">
                    <img className="info-container__img" src={icon}></img>
                    <h4 className="info-container__text">{video.category}</h4>
                  </div>
                  <h4 className="info-container__text">{video.rating}</h4>
                </div>
                <div className="info-container--bottom">
                  <h3>{video.title}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
