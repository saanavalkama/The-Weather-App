import { useEffect, useState } from "react"
import { useWeather } from "../hooks/useWeather"
import WeatherScreen from "./WeatherScreen"

export default function WeatherAtCurrLocation({setLocationObject,locationObj,metric, onAddFavorites}){

  const [error, setError] = useState(null)

  useEffect(()=>{
    if(!navigator.geolocation){
      setError("browser cannot access location")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      setLocationObject({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
        city:null
      })
    },(err)=>{
      setError(err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const {weather, isLoading} = useWeather(locationObj.lat, locationObj.lon)

  useEffect(()=>{
    if(weather?.location?.name){
      setLocationObject(prev => ({
        ...prev,
        city: weather?.location?.name
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[weather])

  console.log(locationObj)

  return(
    <div>
      {error && <p>Something went wrong</p>}
      {isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <div className="weather-at-location">
          <Location location={weather?.location} />
          <button
            onClick={()=>onAddFavorites(locationObj)}
            className="add-fav-btn"
          >
            Add to favorites
          </button>
          <WeatherScreen 
            curr={weather?.current} 
            forecast={weather?.forecast?.forecastday} 
            isLoading={isLoading}
            metric={metric} 
        />
      </div>)}
    </div>
  )
}

function Location(location){

  return(<div className='location'>
    <h2>{location?.location?.name}</h2>
    <div>
      <h4>{location?.location?.lat}&deg;</h4>
      <h4>{location?.location?.lon}&deg;</h4>
    </div>
  </div>)

}

