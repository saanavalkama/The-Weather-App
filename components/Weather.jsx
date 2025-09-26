import { useState, useEffect } from "react";
import Switch from "./Switch";

export default function Weather({city}){

  const weatherApiKey = import.meta.env.VITE_APP_API_KEY_WEATHER;

  const [weather, setWeather] = useState(null)
  const [metric, setMetric] = useState(true)

  
  useEffect(()=>{

    async function getWeather(){
      try{
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=3&aqi=no&alerts=no`
        const res = await fetch(url)
        if(!res.ok){
          throw new Error('something went wrong while fetching data')
        }
        
        const data = await res.json()
        setWeather(data)

      } catch(err){
        console.log(err)
      }
    }
    city && getWeather()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[city])

  if(!weather){
    return <p>weather for {city}</p>;
  }


  return(
    <div className='weather'>
      <h3>{weather?.location?.name}</h3>
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
        <Forecast item={forecastList[0]} metric={metric} />
        <Forecast item={forecastList[1]} metric={metric}/>
        <Forecast item={forecastList[2]} metric={metric}/>
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