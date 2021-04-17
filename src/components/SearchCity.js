import {
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WeatherCard from "./weatherCard";
import fetchData from "./services/data";
export default function SearchCity() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [metric, setMetric] = useState(true);
  const [loading, setLoading] = useState(false);
  const [changeInCity, handleChangeInCity] = useState(false);

  useEffect(() => {
    if (weatherData?.coordinates) {
      setWeatherData({});
    }
  }, [changeInCity]);

  const handleCity = (e) => {
    handleChangeInCity(true);
    setCity(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    handleChangeInCity(false);
    getLatLong(city);
  };
  const getLatLong = async (props) => {
    try {
      const response = await fetchData.getLatLong(props);
      setCountry(response.sys.country);
      if (response.sys.country) {
        return await getDailyWeather(
          response.coord.lat,
          response.coord.lon,
          metric
        );
      }
    } catch (e) {
      console.error(e);
      alert("Please re-enter the city");
    }
  };
  const getDailyWeather = async (lat, long, metric) => {
    try {
      const weatherData = await fetchData.getDailyWeather(lat, long, metric);
      weatherData.coordinates = {
        lat,
        long,
      };
      setWeatherData(weatherData);
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    }
  };
  const renderWeatherCard = () => {
    return (
      <WeatherCard
        data={weatherData?.coordinates && weatherData}
        city={weatherData?.coordinates && city}
      />
    );
  };
  const renderLatLon = () => {
    if (weatherData)
      return (
        <Typography>
          Lat: {weatherData?.coordinates.lat} Long:{" "}
          {weatherData?.coordinates.long}
        </Typography>
      );
  };
  const renderLoading = () => {
    if (loading) {
      return (
        <div className='linearLoaderContainer'>
          <LinearProgress className='linearLoader' />;
        </div>
      );
    }
  };
  console.log(weatherData);
  return (
    <div className='pageContainer'>
      <div className='titleContainer'>
        <Typography variant='h4'>Weather App</Typography>
      </div>
      <div className='searchContainer'>
        <div className='textfieldContainer'>
          <TextField
            variant='outlined'
            value={city}
            label='Enter City'
            onChange={handleCity}
            fullWidth={true}></TextField>
        </div>
        <div className='searchButtonContainer'>
          <Button
            className='searchButton'
            onClick={handleSubmit}
            color='primary'
            variant='contained'
            size='large'>
            Search
          </Button>
        </div>
      </div>
      {renderLoading()}
      {weatherData.daily && (
        <div className='countryCodeContainer'>
          <div className='cityCountryContainer'>
            <Typography variant='h2' color='primary'>
              {city}, {country}
            </Typography>
          </div>
          <div className='coordinatesContainer'>{renderLatLon()}</div>
        </div>
      )}
      <div className='weatherCardContainer'>
        {weatherData?.daily && renderWeatherCard()}
      </div>
    </div>
  );
}
