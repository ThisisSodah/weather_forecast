import { Button, Card, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import WeatherCard from "./weatherCard";
import fetchData from "../components/services/data";
export default class DisplayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      lat: "",
      long: "",
      weatherData: {},
      metric: true,
    };
  }
  handleChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  handleSubmit = async () => {
    await this.getLatLong(this.state.city);
  };
  getLatLong = async (props) => {
    const response = await fetchData.getLatLong(props);
    this.setState(
      {
        lat: response.coord.lat,
        long: response.coord.lon,
        city: response.name,
        country: response.sys.country,
      },
      () =>
        this.getDailyWeather(this.state.lat, this.state.long, this.state.metric)
    );
  };

  getDailyWeather = async (lat, long, metric) => {
    const weatherData = await fetchData.getDailyWeather(lat, long, metric);
    weatherData.coordinates = {
      lat,
      long,
    };
    this.setState({
      weatherData,
    });
  };

  renderWeatherCard = (weatherData, city) => {
    return <WeatherCard data={weatherData} city={city} />;
  };

  render() {
    return (
      <>
        <Card className='weatherCard'>
          <div className='appHeader'>
            <Typography variant='h4'>Material UI Weather Web App</Typography>
          </div>
          <div className='searchContainer'>
            <div className='textfieldContainer'>
              <TextField
                variant='outlined'
                value={this.state.city}
                label='Enter City'
                onChange={this.handleChange}
                fullWidth={true}
              />
            </div>
            <div className='searchButtonContainer'>
              <Button
                className='searchButton'
                onClick={this.handleSubmit}
                color='primary'
                variant='contained'>
                Search
              </Button>
            </div>
          </div>
          {this.state.weatherData.daily ? (
            <div className='countryCodeContainer'>
              <div className='cityCountryContainer'>
                <Typography variant='h2' color='primary'>
                  {this.state.city}, {this.state.country}
                </Typography>
              </div>
              <div className='coordinatesContainer'>
                Lat: {this.state.lat} Lng: {this.state.long}
              </div>
            </div>
          ) : null}
          <div className='weatherCardContainer'>
            {this.state.weatherData.daily
              ? this.renderWeatherCard(this.state.weatherData, this.state.city)
              : null}
          </div>
        </Card>
      </>
    );
  }
}
