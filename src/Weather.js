import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const API_KEY = 'fc1e3326eb5ed888a43df48678e5c121';

function Weather() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('');

  const getWeatherByLocation = async (location) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: location,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSearch = async () => {
    await getWeatherByLocation(location);
  };

  return (
    <div className="weather-app">
    <h1 className='name'>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {weather.main && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-details">
            <div className="temperature">
              <span>{Math.round(weather.main.temp)}°C</span>
            </div>
            <div className="conditions">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
              <span>{weather.weather[0].description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
