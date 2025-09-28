export default function Favourites({favorites, onDeleteFavorite, setLocationObject, setShowFavorite}){

  return(
    <div className="favourites">
      <h2>Favourite cities</h2>
      <ul>
        {favorites.map((city,index) => 
        <CityItem 
          key={index} 
          city={city} 
          onDeleteFavorite={onDeleteFavorite} 
          setLocationObject={setLocationObject}
          setShowFavorite={setShowFavorite}
          />)}
      </ul>
    </div>
  )
}

function CityItem({city, onDeleteFavorite, setLocationObject, setShowFavorite}){

  return(
    <li className="fav-li-item">
      <p>{city.city}</p>
      <button 
        className="get"
        onClick={()=>{
          setLocationObject({lat: city.lat, lon:city.lon, city: city.city})
          setShowFavorite(false)
        }}
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
