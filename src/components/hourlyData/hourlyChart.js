import { Typography } from "@material-ui/core";
import React from "react";
import { Line } from "react-chartjs-2";
const HourlyChart = (props) => {
  return (
    <div className='chartContainer'>
      <Line
        data={{
          labels: props.data.data,
          datasets: [
            {
              label: "Temperature in Celsius",
              data: props.data.temp,
              backgroundColor: "rgba(49, 70, 165, 0.8)",
              borderColor: "#dc004e",
              borderWidth: 3,
            },
          ],
        }}
        height={400}
        width={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
      <div className='footer'>
        <Typography variant='h4' color='secondary'>
          Hourly data for {props.city} for the day of {props.day}
        </Typography>
      </div>
    </div>
  );
};
export default HourlyChart;
