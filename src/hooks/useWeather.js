import { useEffect, useState } from "react";

export function useWeather(city){

  const weatherApiKey = import.meta.env.VITE_APP_API_KEY_WEATHER;
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    if(!city) return

    async function getWeather(){

      setIsLoading(true)

      try{
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=3&aqi=no&alerts=no`
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

  },[city])

  return {weather, isLoading }

}
