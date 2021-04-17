import "./App.css";
import SearchCity from "./components/SearchCity";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HourlyData from "./components/hourlyData/hourlyData";

const App = () => {
  return (
    <BrowserRouter>
      <div className='root'>
        <Switch>
          <Route exact path='/' component={SearchCity} />
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
      </div>
    </BrowserRouter>
  );
};

export default App;
