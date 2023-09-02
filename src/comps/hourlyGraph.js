import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation'; // Import the annotation plugin
import Chart from 'chart.js/auto';
import { CategoryScale, TimeScale } from 'chart.js';
import "./../styles/graph.css"

const WeatherChart = ({ city,screenWidth }) => {
    const [hourlyData, setHourlyData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
   


    useEffect(() => {
        const apiKey = '084a61133e7a78a1ec1c625428717d1b';
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                setHourlyData(data.list);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, [city]);




    const updateChartData = () => {
        const dataToShow = screenWidth < 600 ? 5 : 8;
        const endIndex = startIndex + dataToShow;
        const slicedData = hourlyData.slice(startIndex, endIndex);
        const labels = slicedData.map(entry => formatTime(entry.dt_txt));
        const temperatureData = slicedData.map(entry => entry.main.temp);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatureData,
                    fill: {
                        target: 'origin', // Fill from the origin (x-axis)
                        above: '#B5D8FF', // Color above the line
                    },
                    borderColor: '#5C9CE5',
                    tension: 0.3,
                },
            ],
        };
    };
    const formatTime = (time) => {
        const date = new Date(time);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return (
            <div>
                <p className='time'>{`${formattedHours}${ampm}`}</p>
                <p className='month'>{`${month} ${day}`}</p>

            </div>
        );
    };

    const chartData = updateChartData();

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            x: {
                grid: {
                    drawTicks: false,
                },
                ticks: {
                    padding: 10,
                    display: false,

                },
            },
            y: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false, // Set tooltips to disabled
            },
        },
        layers: {
            aboveDataset: true, // Draw grid lines above the datasets
        },

    };

    const handleNextButtonClick = () => {
        const dataToShow = screenWidth < 600 ? 5 : 8;
        const newStartIndex = startIndex + dataToShow;
        if (newStartIndex < hourlyData.length) {
            setStartIndex(newStartIndex);
        }
    };

    const handlePrevButtonClick = () => {
        const dataToShow = screenWidth < 600 ? 5 : 8;
        const newStartIndex = startIndex - dataToShow;
        if (newStartIndex >= 0) {
            setStartIndex(newStartIndex);
        }
    };




    return (
        <div className='graphContainer'>
            <div className='graphHandler'>
                <p>Upcoming hours</p>
                <div className='btns'>
                    <p onClick={handlePrevButtonClick} className='nextday prevday'><span className="material-symbols-rounded ">
                        chevron_left
                    </span>Prev </p>
                    <p onClick={handleNextButtonClick} className='nextday'>Next<span className="material-symbols-rounded">
                        chevron_right
                    </span> </p>
                </div>

            </div>
            <div className='graphContent'>
                <div className='hourWeatherDetails'>
                    {hourlyData.slice(startIndex, startIndex + (screenWidth < 600 ? 5 : 8)).map((item) => (
                        <div className='hourDetails' key={item.dt}>
                            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon" />
                            <p>{`${Math.round(item.main.temp)}°`}</p>
                            <p className='weatherName'>{item.weather[0].main}</p>
                        </div>
                    ))}
                </div>

                <div className="graph" >
                    <Line data={chartData} options={chartOptions} />
                </div>
                <div className='hourWeatherDetails'>
                    {hourlyData.slice(startIndex, startIndex + (screenWidth < 600 ? 5 : 8)).map((item) => (

                        <div className='hourDetails Time' key={item.dt} style={{ textAlign: 'center' }}>
                            {formatTime(item.dt_txt)}
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );

};

export default WeatherChart;
