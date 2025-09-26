import {useState} from 'react'

//components
import WeatherMap from '../components/WeatherMap';
import Weather from '../components/Weather';
import Search from '../components/Search';
import { Header, Box, AppContainer, Container } from '../components/Layout';

export default function App(){

  const [geoLocation, setGeoLocation] = useState([51.505, -0.09])
  const [city, setCity] = useState('')

  function handleGeoLocation(lat,long,city){
    setGeoLocation([lat,long])
    setCity(city)
  }

  return(
    <Container >
      <Header />
      <AppContainer>
        <Box>
          <WeatherMap geoLocation={geoLocation}/>
        </Box>
        <Box>
          {city && <Weather city={city}/>}
        </Box>
      </AppContainer>
      <Search handleGeoLocation={handleGeoLocation}/>
    </Container>
  )
}










