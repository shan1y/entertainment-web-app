import { useEffect, useState } from "react";
import "./HomeSections.scss";
import Grid from "../Grid/Grid";
import axios from "axios";
import { baseUrl } from "../../utils/api-urls";

let dataRow: {
  category: string;
  isBookmarked: string;
  isTrending: string;
  rating: string;
  thumbnail: string;
  title: string;
  year: number;
  id: number;
};

function HomeSections(props: any) {
  const [data, setData] = useState<typeof dataRow[]>([]);
  const [trendingCarousel, setTrendingCarousel] = useState<string[]>([]);

  interface HomeSectionsProps {
    query: string;
    props: any;
  }

  const homeProperties: HomeSectionsProps = {
    query: "/recommended",
    props: props,
  };

  const handleClick = (isBookmarked: string, id: number) => {
    axios
      .patch(`${baseUrl}/bookmark/${id}/${isBookmarked}`)
      .then(() => {
        return axios.get(`${baseUrl}`.concat("/trending"));
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data)
        return response.data;
      })
      .then((videoData) => {
        let trendingVids: string[] = [];
        videoData.forEach((row: typeof dataRow) => {
          trendingVids.push(row.thumbnail.substring(19));
        });
        setTrendingCarousel(trendingVids);
      });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/trending`)
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .then((videoData) => {
        let trendingVids: string[] = [];
        videoData.forEach((row: typeof dataRow) => {
          trendingVids.push(row.thumbnail.substring(19));
        });
        setTrendingCarousel(trendingVids);
      });
  }, []);

  console.log(data)

  if (data.length === 0 && trendingCarousel.length === 0) {
    return <></>;
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
                    <div className="tile__media tile__media--trending">
                      <img
                        className="tile__img"
                        src={`${baseUrl}`.concat(`${video}`)}
                        alt=""
                      />
                      <div className="movies__bookmarked-circle"></div>
                      <div
                        onClick={() => {
                          handleClick(data[index].isBookmarked, data[index].id);
                        }}
                        className={"movies__bookmarked--".concat(
                          `${data[index].isBookmarked}`
                        )}
                      ></div>

                      <div className="info-container__trending">
                        <div className="info-container--top info-container--top-trending">
                          <h4 className="info-container__text">
                            {data[index].year}
                          </h4>
                          <div className="info-container__movie">
                            <div
                              className={"info-container__img--".concat(
                                data[index].category
                              )}
                            ></div>
                            <h4 className="info-container__text">
                              {data[index].category}
                            </h4>
                          </div>
                          <h4 className="info-container__text">
                            {data[index].rating}
                          </h4>
                        </div>
                        <div className="info-container--bottom">
                          <h3 className="info-container__trending-title">
                            {data[index].title}
                          </h3>
                        </div>
                      </div>
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
