import { useState } from "react";
import Switch from "./Switch";
import { useWeather } from "../hooks/useWeather";
import { v4 as uuidv4 } from "uuid"


export default function Weather({city, setFavorites}){

  const [metric, setMetric] = useState(true)
  
  const {weather, isLoading} = useWeather(city)
  

  function handleAddFavorite(){
    const cityObject = {
      city: weather?.location?.name, 
      id: uuidv4(),
      lat: weather?.location?.lat,
      lon: weather?.location?.lon
    }
    setFavorites((prev)=>{
      const exists = prev.some(fav => fav.city.toLowerCase() === city.toLowerCase())
      if (exists) return prev
      return [...prev, cityObject]
    })
  }


  return(
    <div>
      {isLoading && <p className="loading">loading</p>}
      {!isLoading  && (
        <div className='weather'>
          <div className="weather-header-row">
            <h3>{weather?.location?.name}</h3>
            <button 
              className="fav-button"
              onClick={handleAddFavorite}
            >
              Add to favorites ⭐
            </button>
          </div>
         <CurrentForeCast 
          current={weather?.current}
          metric={metric} />
        <ThreeDayForecast 
          forecastList={weather?.forecast?.forecastday}
          metric={metric}
        />
        <Switch 
          text="metric" 
          checked={metric}
          onChange={()=>setMetric((prev)=>!prev)} 
          className="slider" 
        />
      </div>)}
    </div>
  )
}



function CurrentForeCast({current, metric}){

  const currentWeatherObject = {
    temp_c : Math.round(current?.temp_c),
    temp_f : Math.round(current?.temp_f),
    icon: current?.condition?.icon,
    icon_text: current?.condition?.text,
    humidity: current?.humidity,
    windSeedKmh: current?.wind_kph,
    windSpeedMph: current?.wind_mph
  }

  return(
    <div className="current-weather">
       <h3>
        {metric ? currentWeatherObject.temp_c : currentWeatherObject.temp_f}
        {metric ? '°C' : '°F'}
        </h3>
       <img src={currentWeatherObject.icon} alt={currentWeatherObject.icon_text}/>
        <p>
          <span>Humidity</span>
          <span>{currentWeatherObject.humidity}%</span>
        </p>
        <p>
          <span>Wind speed</span>
          <span>{metric ? currentWeatherObject.windSeedKmh : currentWeatherObject.windSpeedMph}{metric ? 'km/h' : 'mph'}</span>
        </p>
    </div>
  )
}

function ThreeDayForecast({forecastList, metric}){
 
  return(
    <div className="forecast">
      <h3>Three day forecast</h3>
      <div className="three-day-forecast">
        <Forecast item={forecastList?.[0]} metric={metric} />
        <Forecast item={forecastList?.[1]} metric={metric} />
        <Forecast item={forecastList?.[2]} metric={metric} />
      </div>
    </div> 
  )
}

function Forecast({item, metric}){

  function getWeekday(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  const weekday = getWeekday(item?.date)

  const weatherObj = {
    avgC: Math.round(item?.day?.avgtemp_c),
    avgT: Math.round(item?.day?.avgtemp_f),
    icon: item?.day?.condition?.icon,
    icon_text: item?.day?.condition?.text
  }
 
  return(
    <div className="one-day-foreacts">
      <p>{weekday}</p>
      <img src={weatherObj.icon} alt={weatherObj.icon_text} />
      <p>{metric ? weatherObj.avgC : weatherObj.avgT}{metric ? '°C' : '°F'}</p>
    </div>
  )
}