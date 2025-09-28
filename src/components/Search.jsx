import {useState} from 'react'
import { useAutoComplete } from '../hooks/useAutoComplete'


export default function Search({ setLocationObject,setShowFavorite, setCurrentLocation}){

  const [query, setQuery] = useState('')

  const {autocomplete, loading} = useAutoComplete(query)

  console.log(autocomplete)


  return(
    <div className='search'>
      <input
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />
      {loading && <p>loading</p>}
      {autocomplete && !loading && <CityList 
        features={autocomplete} 
        setLocationObject={setLocationObject} 
        setShowFavorite={setShowFavorite}
        setCurrentLocation={setCurrentLocation}
        />}
    </div>
    
  )
}

function CityList({features, setLocationObject, setShowFavorite, setCurrentLocation}){
  return(
    <ul>
      {features.map((feature,indx)=>
        <CityItem 
          key={indx} 
          feature={feature} 
          setLocationObject={setLocationObject}
          setShowFavorite={setShowFavorite}
          setCurrentLocation={setCurrentLocation}
       />)}
    </ul>
  )
}

function CityItem({feature, setLocationObject, setShowFavorite,setCurrentLocation}){


  if(feature.properties.result_type === 'city'){
    return(
    <li 
      type='button'
      onClick={()=>{
        setCurrentLocation(false)
        setLocationObject({lat:feature.properties.lat, lon:feature.properties.lon, city:feature.properties.city })
        setShowFavorite(false)
      }} 
    >
      {feature.properties.address_line1}, {feature.properties.address_line2}
    </li>
  )
  }
  
}
