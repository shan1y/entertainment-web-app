import React from 'react'
import './Navigation.scss'
import logo from '../../assets/icons/logo.svg'
import home from '../../assets/icons/icon-nav-home.svg'
import movies from '../../assets/icons/icon-nav-movies.svg'
import tv from '../../assets/icons/icon-nav-tv-series.svg'
import bookmark from '../../assets/icons/icon-nav-bookmark.svg'
import avatar from "../../assets/icons/image-avatar.png"

function Navigation() {
  return (
    <div className="nav">
        <img className='nav__logo' alt="site logo" src={logo}></img>
        <div className="nav__icon-container">
            <img className="nav__icon" src={home} alt=""></img>
            <img className="nav__icon" src={movies} alt=""></img>
            <img className="nav__icon" src={tv} alt=""></img>
            <img className="nav__icon" src={bookmark} alt=""></img>
        </div>
        <div className="nav__avatar">
            <img src={avatar} alt="avatar" className="nav__avatar-img" />
        </div>

    </div>
  )
}

export default Navigation