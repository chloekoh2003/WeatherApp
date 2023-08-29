import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import drizzle_icon from '../Assets/drizzle.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {


    let api_key = "3827e91d565737898981a67b03d4c19e";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value==""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let reponse = await fetch(url);
        let data = await reponse.json();

        const  humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temp[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon=="01d" || data.weather[0].icon=="01n"){
            setWicon(clear_icon);
        } else if(data.weather[0].icon=="02d" || data.weather[0].icon=="02n"){
            setWicon(cloud_icon);
        } else if(data.weather[0].icon=="03d" || data.weather[0].icon=="03n"){
            setWicon(cloud_icon);
        } else if(data.weather[0].icon=="04d" || data.weather[0].icon=="04n"){
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon=="09d" || data.weather[0].icon=="09n"){
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon=="10d" || data.weather[0].icon=="10n"){
            setWicon(rain_icon);
        } else if(data.weather[0].icon=="11d" || data.weather[0].icon=="11n"){
            setWicon(rain_icon);
        } else if(data.weather[0].icon=="12d" || data.weather[0].icon=="12n"){
            setWicon(snow_icon);
        } else{
            setWicon(clear_icon);
        }
    }

  return (
    <div class="container">
    <div class="top-bar">
        <input type="text" class="cityInput" placeholder="Search city"/>
        <div class="search-icon" onClick={()=>{search()}}>
            <img src={search_icon} alt=""/>
        </div>
    </div>
    <div class="weather-image">
        <img src={wicon} alt=""/>
    </div>
    <div class="weather-temp">--°C</div>
    <div class="weather-location">City</div>
    <div class="data-container">
        <div class="element">
            <img src={humidity_icon} alt="" class="icon"/>
            <div class="data">
                <div class="humidity-percent">--%</div>
                <div class="text">Humidity</div>
            </div>
        </div>
        <div class="element">
            <img src={wind_icon} alt="" class="icon"/>
            <div class="data">
                <div class="wind-speed">-- km/h</div>
                <div class="text">Wind Speed</div>
            </div>
        </div>
    </div>
</div>

  )
}

export default WeatherApp
