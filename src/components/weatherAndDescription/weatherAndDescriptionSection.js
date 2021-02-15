import React from "react";
import RainIconAndDescription from "././iconsAndDesc/rainIconAndDescription";
import SnowIconAndDescription from "././iconsAndDesc/snowIconAndDescription";
import ClearIconAndDescription from "././iconsAndDesc/clearIconAndDescription";
import CloudyIconAndDescription from "././iconsAndDesc/cloudyIconAndDescription";

const WeatherAndDescriptionSection = (props) => {
  if (props.weather.weatherIconId >= 200 && props.weather.weatherIconId < 600)
    return <RainIconAndDescription weather={props.weather} />;
  else if (
    props.weather.weatherIconId >= 600 &&
    props.weather.weatherIconId < 623
  )
    return <SnowIconAndDescription weather={props.weather} />;
  else if (
    props.weather.weatherIconId >= 700 &&
    props.weather.weatherIconId < 801
  )
    return <ClearIconAndDescription weather={props.weather} />;
  else if (
    props.weather.weatherIconId >= 801 &&
    props.weather.weatherIconId < 805
  )
    return <CloudyIconAndDescription weather={props.weather} />;
};
export default WeatherAndDescriptionSection;
