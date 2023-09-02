import React, { useState } from 'react';
import SearchIcon from "./search.svg"
import "./../styles/input.css"

function CityInput({ fetchWeatherData }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  return (

<form className="searchbar" onSubmit={handleSubmit}>
<input type="text" placeholder="search city..." value={city}  onChange={(e) => setCity(e.target.value)} />
<button type="submit"><img src={SearchIcon} alt="Search"/></button>
</form>
  );
}

export default CityInput;
