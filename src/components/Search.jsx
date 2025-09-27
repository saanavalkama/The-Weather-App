import {useState, useEffect} from 'react'


export default function Search({ handleGeoLocation }){

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
      <CityList features={autoComplete} handleGeoLocation={handleGeoLocation}/>
    </div>
    
  )
}

function CityList({features, handleGeoLocation}){
  return(
    <ul>
      {features.map((feature,indx)=><CityItem key={indx} feature={feature} handleGeoLocation={handleGeoLocation} />)}
    </ul>
  )
}

function CityItem({feature, handleGeoLocation}){

  if(feature.properties.result_type === 'city'){
    return(
    <li 
      type='button'
      onClick={()=>handleGeoLocation(feature.properties.lat,feature.properties.lon,feature.properties.city)}
    >
      {feature.properties.address_line1}, {feature.properties.address_line2}
    </li>
  )
  }
  
}
