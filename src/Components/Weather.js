import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'weather-icons/css/weather-icons.min.css'


const weatherCodes = {
    "113" : "sunny",
    "116" : "partly cloudy",
    "119" : "cloudy",
    "122" : "overcast",
    "143" : "mist",
    "176" : "patchy rain possible",
    "179" : "patchy snow possible",
    "182" : "patchy sleet possible",
    "185" : "patchy freezing drizzle possible",
    "200" : "thundry outbreaks possible",
    "227" : "blowing snow",
    "230" : "blizzard",
    "248" : "fog",
    "260" : "freezing fog",
    "263" : "patchy light drizzle",
    "266" : "light drizzle",
    "281" : "freezing drizzle",
    "284" : "heavy freezing drizzle",
    "293" : "patchy light rain",
    "296" : "light rain",
    "299" : "moderate rain at times",
    "302" : "moderate rain",
    "305" : "heavy rain at times",
    "308" : "heavy rain",
    "311" : "light freezing rain",
}


const api_data = {
    "key" : "446c9f64ad97ba1cea060a973a2f1b8c",
    "url" : "http://api.weatherstack.com/current",
};

function checkIsTimeDay(str) {
    let hr = parseInt(str.split(" ")[1].split(":")[0]);
    console.log(hr);
    console.log(hr >= 6 && hr <= 18);
    return (hr >= 6 && hr <= 18);
}

function Weather() {
    let [loc, setLoc] = useState("New York");
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState(loc);
    const [isRequesting, setIsRequesting] = useState(true);
    const [isDay, setIsDay] = useState(false);
    
    // define the icons to be used
    const weatherCodesImages = {
        "113" : "wi-day-sunny",
        "116" : "wi-cloud",
        "119" : "wi-cloudy",
        "122" : "wi-day-sunny-overcast",
        "143" : isDay ? "wi-day-fog" : "wi-night-fog",
        "176" : isDay ? "wi-day-showers" : "wi-night-showers",
        "179" : isDay ? "wi-day-snow" : "wi-night-alt-snow",
        "182" : isDay ? "wi-day-sleet" : "wi-night-sleet",
        "185" : isDay ? "wi-day-sprinkle" : "wi-night-drizzle",
        "200" : isDay ? "wi-day-thunderstorm" : "wi-night-alt-thunderstorm",
        "227" : isDay ? "wi-day-snow-wind" : "wi-night-alt-snow-wind",
        "230" : isDay ? "wi-day-windy" : "wi-night-alt-cloudy-gusts",
        "248" : isDay ? "wi-day-fog" : "wi-night-fog",
        "260" : isDay ? "wi-day-fog" : "wi-night-fog",
        "263" : isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle",
        "266" : isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle",
        "281" : isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle",
        "284" : isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle",
        "293" : "wi-showers",
        "296" : "wi-showers",
        "299" : "wi-showers",
        "302" : "wi-rain",
        "305" : "wi-rain-mix",
        "308" : "wi-rain",
        "311" : "wi-rain-wind",
    }

    
    // make the api call
    useEffect( () => {
        setIsRequesting(true);
        axios.get(api_data.url, {
            params: {
                access_key: api_data.key,
                query: location
            }
        }).then( (response) => {
            setWeatherData(response.data);
            setIsDay(checkIsTimeDay(response.data.location.localtime));
        }).catch( (error) => {
            console.log(error);
        }).then( () => { 
            setIsRequesting(false);
            
        });
    }, [location]);

    // log the response data to the console when it has been recieved
    useEffect( () => {
        console.log(weatherData);
    }, [weatherData]);

    

    return (
        <div className="weather columns is-centered"  style={{backgroundColor: "green"}}>
            <div style={{backgroundColor: "pink"}} className="column is-three-fifths">
                <div className="">
                    <div className="weather-info-top">
                        <i className={"weather-info-icon wi " + (isRequesting ? "" : weatherCodesImages[weatherData.current.weather_code])}></i>
                        <span className="weather-info-temperature">{isRequesting ? "-" : weatherData.current.temperature}</span>
                        <span className="weather-info-moreinfo">
                            <span className="weather-info-search-location">{ isRequesting ? "-" : weatherData.location.name }</span>
                            <span className="weather-info-search-time">{isRequesting ? "-" : weatherData.location.localtime}</span>
                        </span>
                    </div>

                    <form className="form">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input weather-search-input" value={loc} onChange={ (event) => setLoc(event.target.value) } type="text" placeholder="enter location" />
                            </div>
                            <div className="control">
                                <a className="button is-success" onClick={ () => setLocation(loc) }> {isRequesting ? "loading" : "Search"} </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Weather;