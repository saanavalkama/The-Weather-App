import { getLocations } from "../services/getLocations"
import { useEffect, useState } from "react"

export function useAutoComplete(query){

    const [autocomplete, setAutoComplete] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
      useEffect(()=>{
    
        if(!query){
          setAutoComplete([])
          return
        }
    
        const controller = new AbortController()
        const signal = controller.signal
    
        async function load(){
          setLoading(true)
          setError(null)
          try{
            const data = await getLocations(query, signal )
            setAutoComplete(data.features)
          } catch(err){
            console.log(err)
            setError(err.message)
          } finally {
            setLoading(false)
          }
        }
        load()
      
        return function(){
            controller.abort()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[query])

      return {autocomplete, loading, error}

    }