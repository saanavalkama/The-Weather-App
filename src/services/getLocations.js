const locationApiKey = import.meta.env.VITE_APP_API_KEY_LOCATION

export async function getLocations(query, signal){

  if(!query) return []

  try{
    const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${locationApiKey}`,{signal})
    if(!res.ok){
        throw new Error('Something went worong while fetching')
    }
        
    const data = await res.json()
    console.log(data)
    return data
  } catch(err){
    console.log(err)
  }  
}