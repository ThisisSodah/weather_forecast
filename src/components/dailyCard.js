import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import moment from "moment";
import { WiCelsius, WiSunrise, WiSunset } from "weather-icons-react";
import WeatherAndDescriptionSection from "./weatherAndDescription/weatherAndDescriptionSection";
import { Link, useHistory } from "react-router-dom";

function formatData(props) {
  let dailyData = {};
  dailyData.date = moment.unix(props.data.dt).format("DD/MM/YYYY");
  dailyData.day = moment.unix(props.data.dt).format("dddd");
  dailyData.sunRise = moment.unix(props.data.sunrise).format("HH:mm");
  dailyData.sunSet = moment.unix(props.data.sunset).format("HH:mm");
  dailyData.minTemp = props.data.temp.min;
  dailyData.maxTemp = props.data.temp.max;
  dailyData.weather = props.data.weather[0].main;
  dailyData.weatherDescription = props.data.weather[0].description;
  dailyData.weatherIconId = props.data.weather[0].id;
  dailyData.humidity = props.data.humidity;
  dailyData.city = props.data.city;
  return dailyData;
}

function renderWeatherDesc(weather) {
  return <WeatherAndDescriptionSection weather={weather} />;
}
const DailyCard = (props) => {
  let history = useHistory();
  function openHourlyData(city, day) {
    history.push(`/${city}/${day}`);
    console.log(history);
  }
  const weather = formatData(props);
  return (
    <>
      <Card className='dailyCard' raised={true}>
        <CardActionArea
          onClick={() => openHourlyData(weather.city, weather.day)}>
          <div className='cardContentContainer'>
            <CardMedia>{renderWeatherDesc(weather)}</CardMedia>

            <div className='maxminContainer'>
              <div className='tempContainer'>
                <div className='caption'>
                  <Typography variant='caption' color='secondary'>
                    Max{" "}
                  </Typography>
                </div>
                <div className='temperature'>
                  <Typography variant='h5'>{weather.maxTemp}</Typography>
                  <WiCelsius
                    size='54'
                    color='rgb(49, 70, 165)'
                    className='celsiusSymbol'
                  />
                </div>
              </div>
              <div className='tempContainer'>
                <div className='Caption'>
                  <Typography variant='caption' color='secondary'>
                    Min{" "}
                  </Typography>
                </div>
                <div className='temperature'>
                  <Typography variant='h5'>{weather.minTemp}</Typography>
                  <WiCelsius
                    size='54'
                    color='rgb(49, 70, 165)'
                    className='celsiusSymbol'
                  />
                </div>
              </div>
            </div>
            <div className='humidityContainer'>
              <Typography variant='body1' color='primary'>
                Humidity: {weather.humidity}%
              </Typography>
            </div>

            <div className='riseAndSetContainer'>
              <div className='sunTimeLabel'>
                <Typography variant='caption' className='sunSetAndSunRise'>
                  Sunrise
                </Typography>
                <WiSunrise size='68' color='primary' className='sunIcon' />
                <div className='sunText'>{weather.sunRise} Hours</div>
              </div>
              <div className='sunTimeLabel'>
                <Typography variant='caption' className='sunSetAndSunRise'>
                  Sunset
                </Typography>
                <WiSunset size='68' color='primary' className='sunIcon' />
                <div className='sunText'>{weather.sunSet} Hours</div>
              </div>
            </div>
            <div className='dateContainer'>
              <Typography variant='h6' color='secondary'>
                {weather.date}
              </Typography>
            </div>
            <Link to={`/${weather.city}/${weather.day}`}>
              <div className='hourlyWeatherButton'>Click for hourly data</div>
            </Link>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};
export default DailyCard;
