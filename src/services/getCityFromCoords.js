const locationApiKey = import.meta.env.VITE_APP_API_KEY_LOCATION

export async function getCityFromCoords(lat,lon){
    try{
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${locationApiKey}`
    const res = await fetch(url)
    if(!res.ok){
      throw new Error("failed to fetch")  
    }
    return await res.json()
    
     } catch (err){
        console.log(err)
     }
}
    
      