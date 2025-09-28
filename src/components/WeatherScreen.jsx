export default function WeatherScreen({curr, forecast, isLoading, metric}){
    

    return(
    <div>
        {isLoading && <p>loading...</p>}
        {!isLoading && (
          <>
            <CurrentWeather curr={curr} metric={metric}/>
            <ThreeDayForecast forecast={forecast} metric={metric}/>
          </>)
        }
    </div>
  )
}

function CurrentWeather({curr,metric}){
  return(
    <div className="curr-weather">
      <h2>{metric ? curr?.temp_c : curr?.temp_f }{metric ? '°C' :'°F' }</h2>
      <img src={curr?.condition?.icon} alt={curr?.condition?.text} />
      <p>
        <span>Humidity</span>
        <span>{curr?.humidity}%</span>
      </p>
      <p>
        <span>Wind</span>
        <span>{metric ? curr?.wind_kph: curr?.wind_mph} {metric ? 'km/h' : 'mph'}</span>
      </p>
    </div>  
  )
}

function ThreeDayForecast({forecast, metric}){
  return(
    <div className="three-day-forecast">
      <ForecastDay forecast={forecast?.[0]} metric={metric} />
      <ForecastDay forecast={forecast?.[1]} metric={metric}/>
      <ForecastDay forecast={forecast?.[2]} metric={metric}/>
    </div>
  )
}

function ForecastDay({forecast, metric}){

  const date = new Date(forecast?.date)
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })


  return(
    <div className="one-day-forecast">
        <h3>{weekday}</h3>
        <img src={forecast?.day?.condition?.icon} alt={forecast?.day?.condition?.icon} />
        <h3>{
        metric ? 
        Math.round(forecast?.day?.avgtemp_c) :
        Math.round(forecast?.day?.avgtemp_f)
        }
        {metric ? '°C' : '°F'}</h3>
    </div>
  )
}