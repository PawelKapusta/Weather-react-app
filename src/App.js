import React, {useState} from 'react';

const api =
    {
      key: "74bcb39d56eb5d130c30b0ceb150abed",
      base: "https://api.openweathermap.org/data/2.5/"
    }

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            console.log(result);
            setWeather(result);
            setQuery('');
          });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;

  }
  const currentDate = (offset) => {

    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const newDateTime = utc + (1000 * offset);
    const convertedDateTime = new Date(newDateTime);

    return dateBuilder(convertedDateTime);
  }
  const description = (des) => {
    const take = des.slice(0, 1).toUpperCase() + des.slice(1);
    return `${take}`;
  }
  return (
      <div className={
        (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input type="text"
                   className="search-bar"
                   placeholder="Search..."
                   onChange={e => setQuery(e.target.value)}
                   value={query}
                   onKeyPress={search}/>
          </div>
          {(typeof weather.main != "undefined") ? (<div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{currentDate(weather.timezone)}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>

              <div className="weather">{description(weather.weather[0].description)}</div>
            </div>
          </div>) : ('')}


        </main>
      </div>
  );
}

export default App;
