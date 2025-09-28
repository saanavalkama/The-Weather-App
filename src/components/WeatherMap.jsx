import { useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'


function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function WeatherMap({geoLocation, setLocationObject}){

  return(
    <div className="weather-map-box">
    <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <LocationMarker setLocationObject={setLocationObject} />
      <RecenterMap center={geoLocation} />
      <Marker position={geoLocation}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    </MapContainer>
    </div>
  )
}

function LocationMarker({setLocationObject}) {
  
  useMapEvents({
    click(e){
      const {lat,lng} = e.latlng;
      setLocationObject({
        lat,
        lon: lng,
        city: null
      })
    }
  })

  return null
}
