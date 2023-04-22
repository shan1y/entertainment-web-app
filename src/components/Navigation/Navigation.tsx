import React from "react";
import "./Navigation.scss";
import logo from "../../assets/icons/logo.svg";
import home from "../../assets/icons/icon-nav-home.svg";
import movies from "../../assets/icons/icon-nav-movies.svg";
import tv from "../../assets/icons/icon-nav-tv-series.svg";
import bookmark from "../../assets/icons/icon-nav-bookmark.svg";
import avatar from "../../assets/icons/image-avatar.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPassValue } from "../../stores/loginPassValueSlice";

function Navigation() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateLogIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    dispatch(setLoginPassValue(''));
    navigateLogIn();
  };

  return (
    <div className="nav">
      <Link to="/">
        <img className="nav__logo" alt="site logo" src={logo}></img>
      </Link>
      <div className="nav__icon-container">
        <NavLink to="/">
          <img className="nav__icon" src={home} alt="home icon"></img>
        </NavLink>
        <NavLink to="movies">
          <img className="nav__icon" src={movies} alt="movie icon"></img>
        </NavLink>
        <NavLink to="series">
          <img className="nav__icon" src={tv} alt="tv icon"></img>
        </NavLink>
        <NavLink to="bookmarked">
          <img className="nav__icon" src={bookmark} alt="bookmark icon"></img>
        </NavLink>
      </div>
      <div className="nav__avatar">
        <img src={avatar} alt="avatar" className="nav__avatar-img" />
      </div>
      <p
        className="nav__logout"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </p>
    </div>
  );
}

export default Navigation;
