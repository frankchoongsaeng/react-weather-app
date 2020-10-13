import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'weather-icons/css/weather-icons.min.css'

const api_data = {
    "key" : "446c9f64ad97ba1cea060a973a2f1b8c",
    "url" : "http://api.weatherstack.com/current",
};

// Check if the an Hour is daytime or night time
function checkIsTimeDay(str) {
    let hr = parseInt(str.split(" ")[1].split(":")[0])
    return (hr >= 6 && hr <= 18);
}

// get the users location 
function getUserLocation(callback) {
    navigator.geolocation.getCurrentPosition((pos) => callback(pos));
}

function Weather(props)  {

    // declare my state variables
    const [weatherDetails, setWeatherDetails] = useState({});
    const [searchLocation, setSearchLocation] = useState(null); //location for requesting data
    const [inputLocation, setInputLocation] = useState("");
    const [isRequesting, setIsRequesting] = useState(true);
    const [isDay, setIsDay] = useState(true);

    const weatherCodeImages = {
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
        "314" : "wi-hail",
        "317" : "wi-sleet",
        "320" : "wi-sleet",
        "323" : "wi-snowflake-cold",
        "326" : "wi-snowflake-cold",
        "329" : "wi-snow",
        "332" : "wi-snow",
        "335" : "wi-snow-wind",
        "338" : "wi-snowflake-cold",
        "350" : "wi-snowflake-cold",
        "353" : "wi-raindrops",
        "356" : "wi-raindrops",
        "359" : "wi-rain",
        "362" : "wi-showers",
        "365" : "wi-rain",
        "368" : "wi-showers",
        "371" : "wi-snowflake-cold",
        "374" : "wi-snowflake-cold",
        "377" : "wi-snowflake-cold",
        "386" : "wi-storm-showers",
        "389" : "wi-thunderstorm",
        "392" : isDay ? "wi-day-snow-thunderstorm" : "wi-night-alt-snow-thunderstorm",
        "395" : isDay ? "wi-day-snow-thunderstorm" : "wi-night-alt-snow-thunderstorm",
    };

    // make api request to the api
    function getLocationWeather(searchLocation) {
        setIsRequesting(true);
        axios.get(api_data.url, {
            params: {
                access_key: api_data.key,
                query: searchLocation,
            }
        }).then( (res) => {
            console.log(res.data);
            setWeatherDetails(res.data);
            setInputLocation(res.data.location.name);
            setIsRequesting(false);
            returnWeatherDetails(res.data);
        }).catch( (err) => {
            console.log(err)
        }).then( () => {

        });
    }

    function returnWeatherDetails(_weatherdata) {
        if(_weatherdata) {
            props.onDataReady(_weatherdata);
        }
    }

    // handle each search event
    function handleSearchEvent(e) {
        e.preventDefault();
        if(inputLocation === searchLocation) {
            alert("can't search Location");
        } else {
            console.log("search-location: " + searchLocation);
            console.log("input-location: " + inputLocation);
            setSearchLocation(inputLocation)
        }
    }

    // get the users current location when the home component is loaded
    // after getting the users location, get the weather details for that location
    useEffect( () => {
        getUserLocation((userPosition) => {
            setSearchLocation(userPosition.coords.latitude + "," + userPosition.coords.longitude);
        });
    }, []);


    // call the api weather data whenever the search location has changed
    useEffect( () => {
        // make sure the search Location variable is valid before making an api call
        if(searchLocation) {
            getLocationWeather(searchLocation);
        } else {
            console.log(searchLocation);
        }
    }, [searchLocation]);

    return (
        <div className="weather columns is-centered" >
            <div className="column is-three-fifths">
                <div className="">
                    <div className="weather-info-top">
                        <i className={"weather-info-icon wi " + ( isRequesting ? "" : weatherCodeImages[weatherDetails.current.weather_code]) } ></i>
                        <span className="weather-info-temperature">{ isRequesting ? "NA" : weatherDetails.current.temperature }</span>
                        <span className="weather-info-moreinfo">
                            <span className="weather-info-search-location">{ isRequesting ? "NA" : weatherDetails.location.name }</span>
                            <span className="weather-info-search-time">{ isRequesting ? "NA" : weatherDetails.location.localtime}</span>
                        </span>
                    </div>

                    <form className="form">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input weather-search-input" value={inputLocation} onChange={(e) => setInputLocation(e.target.value)} type="text" placeholder="enter location" />
                            </div>
                            <div className="control">
                                <button className={ "button is-success " + (isRequesting ? "is-loading" : "" ) } onClick={handleSearchEvent}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Weather;