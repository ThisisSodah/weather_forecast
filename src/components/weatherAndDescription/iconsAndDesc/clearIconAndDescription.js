import { Typography } from "@material-ui/core";
import React from "react";
import { WiDaySunny } from "weather-icons-react";

const ClearIconAndDescription = (props) => {
  return (
    <div className='currentWeatherContainer'>
      <div className='weatherIcon'>
        <WiDaySunny size='180' color='rgb(49, 70, 165)' />
      </div>
      <div className='weatherDescription'>
        <Typography variant='subtitle1' color='secondary'>
          {props.weather.weatherDescription}
        </Typography>
      </div>
    </div>
  );
};
export default ClearIconAndDescription;
