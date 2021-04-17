import React, { useState, useEffect } from "react";
import DailyCard from "./dailyCard";

export default function WeatherCard(props) {
  const [dailyWeather, setDailyWeather] = useState(props.data.daily);
  const city = props.city;

  useEffect(() => {
    getFilteredData();
  });
  const getFilteredData = () => {
    const filteredDailyWeather = [];
    for (let i = 0; i < 5; i++) {
      filteredDailyWeather.push(dailyWeather[i]);
      filteredDailyWeather[i].city = city;
    }
    setDailyWeather(filteredDailyWeather);
  };
  return (
    <>
      {dailyWeather.map((data, index) => {
        return (
          <div className='dailyCardContainer' key={index}>
            <DailyCard data={data} />
          </div>
        );
      })}
    </>
  );
}
