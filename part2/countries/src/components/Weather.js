import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);

  useEffect((capital) => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: capital,
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (weather.length === 0) {
    return <p>No weather info</p>;
  } else {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature: {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} alt="Flag" width="50"></img>
        <p>
          wind: {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  }
};

export default Weather;
