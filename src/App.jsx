//hook and other functions
import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

//components
import WeatherMap from './components/WeatherMap';
import Search from './components/Search';
import { Box, AppContainer, Container, SecondRow, FirstRow } from './components/Layout';
import Favourites from './components/Favourites';
import WeatherAtLocation from './components/WeatherAtLocation.jsx';
import Header from './components/Header';
import Footer from './components/Footer.jsx'
import Weather from './components/Weather.jsx';


export default function App(){

  const [locationObject, setLocationObject] = useState({
    lat: 51.505,
    lon: -0.09,
    city: 'London'
  })

  const [favorites, setFavorites] = useState(favoritesInitializationCallback)
  const [showFavorite, setShowFavorite] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(false)

  function favoritesInitializationCallback(){
    try{
      const storedValue = localStorage.getItem('favorites')
      return storedValue ? JSON.parse(storedValue) : []
    } catch(err){
      console.log(err)
      return []
    }
  }

  function addToFavorites(obj){
    const exists = favorites.some(fav => fav.city === obj.city)
    if(!exists){
      const objToAdd = {...obj, id: uuidv4()}
      setFavorites((prev)=>[...prev,objToAdd])
    }
    setShowFavorite(true)
  }

  function deleteFavorite(id){
    setFavorites((prev)=>
      prev.filter((fav)=> fav.id !== id)
    )
  }

  function itemInFavourites(city){
    return favorites.some(fav => fav.city === city)
  }

  function handleShowFavorite(){
    setShowFavorite((prev)=>!prev)
  }

  useEffect(()=>{
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },[favorites])

  return(
    <Container >
      <Header handleShowFavorite={handleShowFavorite} />
      <AppContainer>
        <FirstRow>
          <WeatherMap 
            geoLocation={[locationObject?.lat, locationObject?.lon]}
            setLocationObject={setLocationObject}
            locationObj={locationObject}
            />
          {showFavorite && 
            <Favourites 
              favorites={favorites}
              onDeleteFavorite={deleteFavorite}
              setLocationObject={setLocationObject}
              setShowFavorite={setShowFavorite}
            />}
          {!showFavorite && 
            <Weather 
              locationObj={locationObject}
              onAddFavorites={addToFavorites}
              itemInFavourites={itemInFavourites} 
              setLocationObject={setLocationObject}
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />}
        </FirstRow>
        <Search 
          setLocationObject={setLocationObject}
          setShowFavorite={setShowFavorite}
          setCurrentLocation={setCurrentLocation}
        />
      </AppContainer>
      <Footer />
    </Container>
  )
}










