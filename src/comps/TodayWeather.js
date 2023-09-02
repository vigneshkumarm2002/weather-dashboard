import React,{useRef} from 'react'

const TodayWeather = ({weatherData}) => {
    const allWeatherDetailsRef = useRef(null);

    function formatTime(timestamp, includeAMPM = false) {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
    
        if (includeAMPM) {
          return `${ampm}`;
        } else {
          return `${formattedHours}:${minutes.toString().padStart(2, '0')}`;
        }
      }

    const weatherDetails = [
        {
          label: 'Humidity',
          value: weatherData?.main?.humidity,
          unit: '%',
          icon: 'humidity_percentage',
        },
        {
          label: 'Wind',
          value: weatherData?.wind?.speed,
          unit: 'm/s',
          icon: 'wind_power',
        },
        {
          label: 'Visibility',
          value: Math.round(weatherData?.visibility / 1000),
          unit: 'km',
          icon: 'visibility',
        },
        {
          label: 'Feels like',
          value: Math.round(weatherData?.main?.feels_like), // Round temperature
          unit: '°C',
          icon: 'device_thermostat',
        },
        {
          label: 'Sunrise',
          value: formatTime(weatherData?.sys?.sunrise),
          unit: formatTime(weatherData?.sys?.sunrise, true), // Pass a second argument to indicate AM/PM format
          icon: 'clear_day',
        },
        {
          label: 'Sunset',
          value: formatTime(weatherData?.sys?.sunset),
          unit: formatTime(weatherData?.sys?.sunset, true), // Pass a second argument to indicate AM/PM format
          icon: 'routine',
        },
        {
          label: 'Pressure',
          value: weatherData?.main?.pressure,
          unit: 'Pa', // Pressure in pascals
          icon: 'compress',
        },
      ];

      const scrollWeatherDetails = (scrollValue) => {
        if (allWeatherDetailsRef.current) {
          allWeatherDetailsRef.current.scrollTo({
            left: allWeatherDetailsRef.current.scrollLeft + scrollValue,
            behavior: 'smooth', 
          });
        }
      };

    return (
        <div className='weatherDetails'>
            <div className='detailsHandler'>
                <p>More details of today's weather</p>
                <div className='slidebtns'>
                    <div onClick={() => scrollWeatherDetails(-500)}><span className="material-symbols-rounded weatherIcon"> chevron_left</span></div>
                    <div onClick={() => scrollWeatherDetails(500)}><span className="material-symbols-rounded weatherIcon"> chevron_right</span></div>
                </div>
            </div>
            <div className='allWeatherDetails' ref={allWeatherDetailsRef}>
                {weatherDetails.map((detail, index) => (
                    <div className='detailContainer' key={index}>
                        <div className='align'>
                            <p>{detail.label}</p>
                            <span className="material-symbols-rounded weatherIcon">{detail.icon}</span>
                        </div>
                        <div className='valueContainer'>
                            <p className='value'>{detail.value}<span>{detail.unit}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodayWeather