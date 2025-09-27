import {useState, useEffect} from 'react'

//components
import WeatherMap from './components/WeatherMap';
import Weather from './components/Weather';
import Search from './components/Search';
import { Header, Box, AppContainer, Container, SecondRow, FirstRow } from './components/Layout';
import Favourites from './components/Favourites';
import  WeatherAtCurrLocation  from './components/WeatherAtCurrLocation';

export default function App(){

  const [geoLocation, setGeoLocation] = useState([51.505, -0.09])
  const [city, setCity] = useState('')
  const [favorites, setFavorites] = useState(favoritesInitializationCallback)

  function favoritesInitializationCallback(){
    try{
      const storedValue = localStorage.getItem('favorites')
      return storedValue ? JSON.parse(storedValue) : []
    } catch(err){
      console.log(err)
      return []
    }
  }

  function handleGeoLocation(lat,long,city){
    setGeoLocation([lat,long])
    setCity(city)
  }


  function deleteFavorite(id){
    setFavorites((prev)=>
      prev.filter((fav)=> fav.id !== id)
    )
  }

  useEffect(()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },[favorites])

  return(
    <Container >
      <Header />
      <AppContainer>
        <FirstRow>
          <Box>
            <WeatherMap geoLocation={geoLocation}/>
          </Box>
          <Box>
            {city && <Weather city={city} setFavorites={setFavorites}/>}
          </Box>
        </FirstRow>
        <SecondRow>
          <Search handleGeoLocation={handleGeoLocation}/>
          <WeatherAtCurrLocation />
        </SecondRow>
        <Favourites 
          favorites={favorites} 
          onDeleteFavorite={deleteFavorite} 
          handleGeoLocation={handleGeoLocation}
        />
      </AppContainer>
    </Container>
  )
}










