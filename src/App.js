import { Paper } from "@material-ui/core";
import "./App.css";
import DisplayCard from "./components/displayCard";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HourlyData from "./components/hourlyData/hourlyData";

const App = () => {
  return (
    <BrowserRouter>
      <div className='root'>
        <Paper className='mainPaper'>
          <Switch>
            <Route exact path='/' component={DisplayCard} />
            <Route path='/:city/:day' component={HourlyData} />
            <Route
              path='/'
              component={
                <div>
                  <h1>404 - Not found</h1>
                </div>
              }
            />
          </Switch>
        </Paper>
      </div>
    </BrowserRouter>
  );
};

export default App;
