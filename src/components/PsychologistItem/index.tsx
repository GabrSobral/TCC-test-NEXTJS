import { FiArrowRight } from 'react-icons/fi'
import 'leaflet/dist/leaflet.css'

import { useEffect, useMemo, useState } from "react";
import LeafLetMap from "../Map";
import Link from "next/link";

import styles from './style.module.scss'
import { useLoading } from '../../contexts/LoadingIcon';

export function PsychologistItem(){
  const [ isBrowser, setIsBrowser ] = useState(false);
  const { setLoadingTrue } = useLoading()

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

        <Link href="/PsychologistDetail">
          <button type="button" onClick={setLoadingTrue}>
            <FiArrowRight size={32} color="#fff"/>
          </button>
        </Link>
      </div>
    </div>
  )
}