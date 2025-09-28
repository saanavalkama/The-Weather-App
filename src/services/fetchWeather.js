const weatherApiKey = import.meta.env.VITE_APP_API_KEY_WEATHER;

export async function getWeather(lat,lon) {
  try{
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;
    const res = await fetch(url)
    if(!res.ok){
        throw new Error("Failed to fetch")
    }
    return  await res.json()
  } catch (err){
    console.log(err)
  }
}