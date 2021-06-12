import { FiArrowRight } from 'react-icons/fi'
import 'leaflet/dist/leaflet.css'

import { useEffect, useMemo, useState } from "react";
import LeafLetMap from "../Map";
import Link from "next/link";

import styles from './style.module.scss'
import { useLoading } from '../../contexts/LoadingIcon';

interface Clinic{
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

export function PsychologistItem({ 
  opening_hours,
  psychologist,
  name,
  description,
  phone_number,
  email,
  latitude,
  longitude
} : Clinic){
  const [ isBrowser, setIsBrowser ] = useState(false);
  const { setLoadingTrue } = useLoading()

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  function arrayToQueryString(array : string[], name: string){
    let queryString = "";
    for (var i=0;i< array.length;i++)
    {
      queryString+=`&${name}=${array[i]}`;
    }
    return queryString
  }

  return(
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <LeafLetMap latitude={latitude} longitude={longitude}/>
      </div>

      <div className={styles.information}>
        <h3>{name}</h3>

        <p className={styles.psychologistName}>{psychologist[0]}</p>
        <span className={styles.locale}>Santos - SP</span>

        <Link 
          href={`/Psychologist/PsychologistDetail?name=${name}&description=${description}${arrayToQueryString(psychologist, "psychologist")}${arrayToQueryString(opening_hours, "opening_hours")}&phone_number=${phone_number}&email=${email}&latitude=${latitude}&longitude=${longitude}`}
        >
          <button type="button" onClick={setLoadingTrue}>
            <FiArrowRight size={32} color="#fff"/>
          </button>
        </Link>
      </div>
    </div>
  )
}