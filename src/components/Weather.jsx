import WeatherAtLocation from "./WeatherAtLocation"
import WeatherAtCurrLocation from './WeatherAtCurrLocation'
import Switch from "./Switch"

import { useState } from "react"

export default function Weather({locationObj, onAddFavorites, itemInFavourites, setLocationObject, currentLocation, setCurrentLocation}){

  const [metric, setMetric] = useState(true)
 

  return(
    <div className="weather">
    { currentLocation ? 
      <WeatherAtCurrLocation
        setLocationObject={setLocationObject}
        locationObj={locationObj}
        metric={metric}
        onAddFavorites={onAddFavorites}
        itemInFavourites={itemInFavourites}
      /> :
      <WeatherAtLocation 
        locationObj={locationObj} 
        metric={metric}
        onAddFavorites={onAddFavorites}
        itemInFavourites={itemInFavourites}
      />
    }
      <div className="switches">
        <Switch 
        checked={currentLocation}
        text="current location"
        onChange={()=>setCurrentLocation((prev)=>!prev)}
        className="slider"
        />
        <Switch 
        checked={metric}
        text="metric"
        onChange={()=>setMetric((prev)=>!prev)}
        className="slider"
        />
      </div>
      
    </div>
  )
}