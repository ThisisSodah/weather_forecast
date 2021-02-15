import { Typography } from "@material-ui/core";
import React from "react";
import { WiSnow } from "weather-icons-react";

const SnowIconAndDescription = (props) => {
  return (
    <div className='currentWeatherContainer'>
      <div className='weatherIcon'>
        <WiSnow size='150' color='rgb(49, 70, 165)' />
      </div>
      <div className='weatherDescription'>
        <Typography variant='subtitle1' color='secondary'>
          {props.weather.weatherDescription}
        </Typography>
      </div>
    </div>
  );
};
export default SnowIconAndDescription;
