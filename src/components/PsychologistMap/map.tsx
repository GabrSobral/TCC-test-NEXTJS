import { icon } from "leaflet"
import Link from "next/link"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { FiArrowRight } from "react-icons/fi"

import styles from './style.module.scss'

const ICON = icon({
  iconUrl : "/MapMarkerRed.svg",
  iconAnchor : [20.5, 55]
})
interface MapProps{
  latitude: number;
  longitude: number;
  isChangeable: boolean;
  content?: Clinics[]
}
interface Clinics{
  _id : string;
  opening_hours: string[];
  psychologist: string[];
  name: string;
  description: string;
  phone_number: string;
  email: string;
  latitude: number;
  longitude: number;
}

const MapLeafLet = ({ latitude, longitude, isChangeable, content }: MapProps) => {
  function arrayToQueryString(array : string[], name: string){
    let queryString = "";
    for (var i=0;i< array.length;i++)
    {
      queryString+=`&${name}=${array[i]}`;
    }
    return queryString
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        center={[-20, -46]}
        zoom={5} 
        style={{ width: '100%', height: "100%", zIndex: 10 }}
        dragging={isChangeable}
        touchZoom={isChangeable}
        zoomControl={false}
        scrollWheelZoom={isChangeable} 
        doubleClickZoom={isChangeable}
      >
        <TileLayer 
          url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        {content.map(clinic => (
           <Marker 
            position={[clinic.latitude, clinic.longitude]} 
            icon={ICON}
            key={clinic._id}
          >
            <Popup 
              closeButton={false} 
              minWidth={240} 
              maxWidth={240} 
              className={styles.mapPopup}
            >
              <span className={styles.clinicName}>{clinic.name}</span>
              <Link href={`/PsychologistDetail?name=${clinic.name}&description=${clinic.description}${arrayToQueryString(clinic.psychologist, "psychologist")}${arrayToQueryString(clinic.opening_hours, "opening_hours")}&phone_number=${clinic.phone_number}&email=${clinic.email}&latitude=${clinic.latitude}&longitude=${clinic.longitude}`}>
                <button type='button' className={styles.mapPopupButton}>
                  <FiArrowRight size={20} color='#fff'/>
                </button>
              </Link>
            </Popup>
          </Marker> 
        ))}
    </MapContainer>
    </div>
  )
}
export default MapLeafLet