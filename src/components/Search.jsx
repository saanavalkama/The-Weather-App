import {useState, useEffect} from 'react'


export default function Search({ setLocationObject,setShowFavorite, setCurrentLocation}){

  const [query, setQuery] = useState('')
  const [autoComplete, setAutoComplete] = useState([])

  const locationApiKey = import.meta.env.VITE_APP_API_KEY_LOCATION

  useEffect(()=>{

    if(!query) return

    const controller = new AbortController()

    async function getLocations(){
      try{
        const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${locationApiKey}`,{signal : controller.signal})
        if(!res.ok){
          throw new Error('Something went worong while fetching')
        }
        
        const data = await res.json()
        setAutoComplete(data.features)
      } catch(err){
        console.log(err)
      }
    }
    getLocations()
  
    return function(){
        controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query])

  return(
    <div className='search'>
      <input
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
      />
      <CityList 
        features={autoComplete} 
        setLocationObject={setLocationObject} 
        setShowFavorite={setShowFavorite}
        setCurrentLocation={setCurrentLocation}
        />
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
