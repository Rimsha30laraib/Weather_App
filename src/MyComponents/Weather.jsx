import React, { useRef,useState } from 'react';
import "./Weather.css";
import searchicon from "../Assets/search.png";
import clearimage from "../Assets/clear.png";
import humidityimg from "../Assets/humidity.png";
import windimg from "../Assets/wind.png";
import cloudimage from "../Assets/cloud.png";
import drizzleimage from "../Assets/drizzle.png"
import rainimage from "../Assets/rain.png";
import snowimage from "../Assets/snow.png";

const Weather = () => {
    const inputRef=useRef();
    const [weatherData,setWeatherData]=useState(false);
    const allIcons={
        "01d":clearimage,
        "01n":clearimage,
        "02d":cloudimage,
        "02n":cloudimage,
        "03d":cloudimage,
        "03n":cloudimage,
        "04d":drizzleimage,
        "04n":drizzleimage,
        "10d":rainimage,
        "10n":rainimage,
        "11d":rainimage,
        "11n":rainimage,
        "13d":snowimage,
        "13n":snowimage  
    }
    const search = async (city) => {
        if (city === ""){
            alert("Enter City Name First")
            return
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok){
                alert(data.message)
                return

            }
            console.log(data);
            const icon= allIcons[data.weather[0].icon] || clearimage
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            })
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    };

    return (
        <div className='component'>
            <div className='searchbar'>
                <input ref={inputRef} type="text" placeholder='Search'/>
                <img src={searchicon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            
            <img src={weatherData.icon} alt="" className='weatherimg'/>
            <p className='temp'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weatherdata'>
                <div className='col'>
                    <img src={humidityimg} alt=""/>
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={windimg} alt=""/>
                    <div>
                        <p>{weatherData.windSpeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
