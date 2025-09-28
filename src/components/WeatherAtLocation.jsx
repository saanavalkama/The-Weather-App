import {useWeather} from '../hooks/useWeather'
import WeatherScreen from './WeatherScreen'
import Switch from './Switch'

export default function WeatherAtLocation({locationObj, metric, onAddFavorites, itemInFavourites}){

  const {weather, isLoading, error} = useWeather(locationObj.lat,locationObj.lon)

  const existInFavorites = itemInFavourites(locationObj.city)

  return(
    <div className='weather-at-location'>
      {error && <p>error</p>}
      {isLoading && <p>loading...</p>}
      {!error && !isLoading && 
        <>
          <Location location={weather?.location} />
          {existInFavorites ? <p className='fav-info'>City is in favorites</p> :
            <button 
              onClick={()=>onAddFavorites(locationObj)}
              className='add-fav-btn'
            >Add to favorites
            </button>}
         <WeatherScreen 
          curr={weather?.current} 
          forecast={weather?.forecast?.forecastday} 
          isLoading={isLoading}
          metric={metric} 
        />
      </>
      }
    </div>)
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