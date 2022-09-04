import React from 'react'
import './SearchHeader.scss'
import icon from '../../assets/icons/icon-search.svg';

function SearchHeader() {
  return (
    <div className="search">
        <img className="search__icon" src={icon} alt="search icon"/>
        <input className="search__field" placeholder='Search for movies or TV series'></input>
    </div>
  )
}

export default SearchHeader