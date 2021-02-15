import React, { Component } from "react";
import fetchData from "../services/data";
import moment from "moment";
import HourlyChart from "./hourlyChart";
import { Card } from "@material-ui/core";

export default class HourlyData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      city: this.props.match.params.city,
      day: this.props.match.params.day,
    };
  }
  async componentDidMount() {
    const params = this.props.match.params;
    const response = await fetchData.getHourlyData(params.city);
    const filteredData = this.filterData(response.list, params.day);
    const chartData = this.formatFilteredData(filteredData);
    this.setState({
      chartData,
    });
  }
  filterData = (listOfArray, day) => {
    const newArray = listOfArray.filter(
      (p) => moment.unix(p.dt).format("dddd") == day
    );

    return newArray;
  };
  formatFilteredData = (filteredArray) => {
    const hours = [];
    const temp = [];
    for (let i = 0; i < filteredArray.length; i++) {
      hours.push(moment.unix(filteredArray[i].dt).format("HH:mm "));
      temp.push(filteredArray[i].main.temp);
    }
    return { data: hours, temp };
  };
  render() {
    return (
      <>
        <Card className='weatherCard'>
          <HourlyChart
            data={this.state.chartData}
            city={this.state.city}
            day={this.state.day}
          />
        </Card>
      </>
    );
  }
}
