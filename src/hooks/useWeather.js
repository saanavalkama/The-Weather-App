import { useEffect, useState } from "react";

export function useWeather(lat,lon){

  const weatherApiKey = import.meta.env.VITE_APP_API_KEY_WEATHER;
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    if(!lat || !lon) return

    async function getWeather(){

      setIsLoading(true)

      try{
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;
        const res = await fetch(url)
        if(!res.ok){
          throw new Error("Failed to fetch")
        }
        const data = await res.json()
        setWeather(data)
        setIsLoading(false)

      }catch(err){
        console.log(err)
        setIsLoading(false)
      }
    }
    getWeather()

  },[lat,lon])

  return {weather, isLoading }

}
