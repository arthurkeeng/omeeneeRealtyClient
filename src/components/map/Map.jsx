import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';
import { useEffect, useState } from 'react';


function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap(); // useMap can now safely access MapContainer context

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], 13); // center and zoom to user's location
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, [map]);

  // Render a marker only if the position is available
  return position ? <Marker position={position}></Marker> : null;
}
function Map({items}){
 
  return (
    <MapContainer center={
      items.length === 1 ? [items[0].latitude , items[0].longitude]:
      [51.505, -0.09]} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=>(
      <Pin item={item} key={item._id}/>
    ))}
    {/* <LocationMarker/> */}
  </MapContainer>
  )
}

export default Map