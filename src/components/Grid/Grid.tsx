import "./Grid.scss";
import icon from "../../assets/icons/icon-category-movie.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import play from "../../assets/icons/icon-play.svg";

let dataRow: {
  id: number;
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
  const { query } = props;
  const { searchTerm } = props.props;

  const handleClick = (isBookmarked: string, id: number) => {
    axios
      .patch(
        `https://entertainment-web-app-server.herokuapp.com/bookmark/${id}/${isBookmarked}`
      )
      .then((response) => {
        return axios.get(
          "https://entertainment-web-app-server.herokuapp.com".concat(query)
        );
      })
      .then((response) => {
        return response.data;
      })
      .then((videoData) => {
        let vidGrid: typeof dataRow[] = [];
        videoData.forEach((row: typeof dataRow) => {
          let parsed = JSON.parse(row.thumbnail);
          row.thumbnail = parsed.regular.large.substring(19);
          vidGrid.push(row);
        });
        setData(vidGrid);
      });
  };

  useEffect(() => {
    axios
      .get("https://entertainment-web-app-server.herokuapp.com".concat(query))
      .then((response) => {
        return response.data;
      })
      .then((videoData) => {
        let vidGrid: typeof dataRow[] = [];
        videoData.forEach((row: typeof dataRow) => {
          let parsed = JSON.parse(row.thumbnail);
          row.thumbnail = parsed.regular.large.substring(19);
          vidGrid.push(row);
        });
        setData(vidGrid);
      });
  }, []);

  if (data.length === 0) {
    return <p></p>;
  } else {
    return (
      <div className="movies">
        {data
          .filter((video) => {
            if (searchTerm === "") {
              return true;
            } else if (
              video.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return true;
            }
          })
          .map((video, index) => {
            return (
              <div key={index} className="movies__tile">
                <div className="movies__image-container">
                  <img
                    alt={`thumbnail of video:${video.title}`}
                    className="movies__image"
                    src={"https://entertainment-web-app-server.herokuapp.com".concat(
                      `${video.thumbnail}`
                    )}
                  ></img>
                  <div className="movies__tile-overlay overlay">
                    <div className="overlay__container">
                      <img
                        className="overlay__icon"
                        src={play}
                        alt="play icon"
                      />
                      <p className="overlay__text">Play</p>
                    </div>
                  </div>
                </div>
                <div className="movies__bookmarked-circle"></div>
                <div
                  onClick={() => {
                    handleClick(data[index].isBookmarked, data[index].id);
                  }}
                  className={"movies__bookmarked--".concat(
                    `${data[index].isBookmarked}`
                  )}
                ></div>
                <div className="movies__info-container info-container">
                  <div className="info-container--top">
                    <h4 className="info-container__text">{video.year}</h4>
                    <div className="info-container__movie">
                      <img
                        className="info-container__img"
                        alt={`thumbnail of video:${video.title}`}
                        src={icon}
                      ></img>
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
