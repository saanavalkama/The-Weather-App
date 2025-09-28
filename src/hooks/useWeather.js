import { useEffect, useState } from "react";
import { getWeather } from "../services/fetchWeather";

export function useWeather(lat,lon){

  const [error, setError] = useState(null)
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    if(!lat || !lon) return

    async function fetchWeather(){
      setIsLoading(true)
      setError(null)
      try{
        const data = await getWeather(lat,lon)
        setWeather(data)
      } catch(err){
        console.log(err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWeather()

  },[lat,lon])

  return {weather, isLoading,error }

}
