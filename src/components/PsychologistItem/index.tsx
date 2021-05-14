import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import dynamic from 'next/dynamic'

import { FiArrowRight } from 'react-icons/fi'
import 'leaflet/dist/leaflet.css'

import styles from './style.module.scss'
import { useEffect, useMemo, useState } from "react";
import LeafLetMap from "../Map";

export function PsychologistItem(){
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return(
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <LeafLetMap/>
      </div>

      <div className={styles.information}>
        <h3>Consultório teste</h3>

        <p className={styles.psychologistName}>Psicóloga Thaíssa Ribeiro</p>
        <span className={styles.locale}>Santos - SP</span>

        <button type="button">
          <FiArrowRight size={32} color="#fff"/>
        </button>
      </div>
    </div>
  )
}