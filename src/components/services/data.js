const API_key = "f8f19cf08d47ac0dd50d5bd7927bc692";

async function getLatLong(props) {
  const apiCall = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${props}&appid=${API_key}`
  );
  const response = await apiCall.json();
  if (response.coord) {
    return response;
  } else {
    window.alert(
      "Sorry I didn't catch that, Could you refresh and enter the name of the City again?"
    );
  }
}

async function getDailyWeather(lat, long, { metric = true }) {
  const oneCallApi = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${API_key}&units=${
      metric ? "metric" : "imperial"
    }`
  );
  const weatherData = await oneCallApi.json();
  return weatherData;
}
async function getHourlyData(city, date) {
  const threeHourlyCall = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`
  );
  const response = threeHourlyCall.json();
  return response;
}

const fetchData = {
  getLatLong,
  getDailyWeather,
  getHourlyData,
};

export default fetchData;
