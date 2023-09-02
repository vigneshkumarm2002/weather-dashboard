import React from 'react'
import countryList from 'country-list';
import CityInput from './CityInput';
import Graph from './hourlyGraph';
import TodayWeather from "./TodayWeather"

const RightContainer = ({weatherData,screenWidth,cityName,fetchWeatherData}) => {
  return (
    <div className='rightContainer'>
    <div className='topBar'>
      {screenWidth > 550 && <CityInput fetchWeatherData={fetchWeatherData} />}
      <div>
        <a
          href={`https://zoom.earth/places/${countryList.getName(
            weatherData.sys.country
          )}/${weatherData.name}/#map=precipitation/model=icon`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="map">
            <span className="material-symbols-rounded">map</span> Map
          </h3>
        </a>
      </div>
    </div>
    <div className="hourlyWeather">
      <Graph city={cityName} screenWidth={screenWidth} />
    </div>
    <TodayWeather weatherData={weatherData} />
  </div>
  )
}

export default RightContainer