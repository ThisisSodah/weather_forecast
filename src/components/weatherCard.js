import React, { Component } from "react";
import DailyCard from "./dailyCard";
export default class weatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyWeatherArray: this.props.data.daily,
      lat: this.props.data.coordinates.lat,
      long: this.props.data.coordinates.long,
      city: this.props.city,
    };
  }
  componentDidMount() {
    const filteredData = this.getFilteredData();
    this.setData(filteredData);
  }
  getFilteredData = () => {
    const filteredDailyWeather = [];
    for (let i = 0; i < 5; i++) {
      filteredDailyWeather.push(this.state.dailyWeatherArray[i]);
      filteredDailyWeather[i].city = this.state.city;
    }
    return filteredDailyWeather;
  };
  setData = (filteredData) => {
    this.setState({
      dailyWeatherArray: filteredData,
    });
  };
  render() {
    return (
      <>
        {this.state.dailyWeatherArray.map((data, index) => {
          return (
            <div className='dailyCardContainer' key={index}>
              <DailyCard data={data} />
            </div>
          );
        })}
      </>
    );
  }
}
