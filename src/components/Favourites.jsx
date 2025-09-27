export default function Favourites({favorites, onDeleteFavorite, handleGeoLocation}){

  return(
    <div className="favourites">
      <h2>Favourite cities</h2>
      <ul>
        {favorites.map((city,index) => <CityItem key={index} city={city} onDeleteFavorite={onDeleteFavorite} handleGeoLocation={handleGeoLocation}/>)}
      </ul>
    </div>
  )
}

function CityItem({city, onDeleteFavorite, handleGeoLocation}){
  return(
    <li className="fav-li-item">
      <p>{city.city}</p>
      <button 
        className="get"
        onClick={()=>handleGeoLocation(city.lat,city.lon,city.city)}
      >Weather</button>
      <button 
        className="delete"
        onClick={()=>onDeleteFavorite(city.id)}
      >
      Delete
      </button>
    </li>
  )
}
