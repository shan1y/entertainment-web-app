import React from "react";
import "./Grid.scss";
import image from "../../assets/thumbnails/asia-in-24-days/regular/large.jpg";
import icon from "../../assets/icons/icon-category-movie.svg";

let data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Grid() {
  return (
    <div className="movies">
      {data.map((movie) => {
        return (
          <div className="movies__tile">
            <img className="movies__image" src={image}></img>
            <div className="movies__info-container info-container">
              <div className="info-container--top">
                <h4 className="info-container__text">2019</h4>
                <div className="info-container__movie">
                  <img className="info-container__img" src={icon}></img>
                  <h4 className="info-container__text">Movie</h4>
                </div>
                <h4 className="info-container__text">PG</h4>
              </div>
              <div className="info-container--bottom">
                <h3>The Great Lands</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
