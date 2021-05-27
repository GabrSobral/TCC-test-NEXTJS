import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import { LoadingStatus } from '../components/LoadingStatus'
import LeafletMap from '../components/Map'

import styles from '../styles/PsychologistDetail.module.scss'

interface Clinic{
  openings_hours: string[];
  psychologist: string[];
  name: string;
  description: string;
  phone_number: string;
  email: string;
  latitude: number;
  longitude: number;
}

export default function PsychologistList(){
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isLoadingStatus, setIsLoadingStatus ] = useState(false)
  const y = useMotionValue(0)

  useEffect(()=> {
    setIsVisible(true)
  },[])

  const router = useRouter()
  const {   
    opening_hours,
    psychologist,
    name,
    description,
    phone_number,
    email,
    latitude,
    longitude 
  }: any = router.query 

  console.log(opening_hours, psychologist)

  return(
    <div className={styles.container}>
      {isLoadingStatus && (
        <LoadingStatus/>
      )}
      <Header GoBackIsActive={true}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
          <div className={styles.mapContainer}>
            <div className={styles.map}>
              <LeafletMap latitude={latitude} longitude={longitude}/>
            </div> 
            <a className={styles.googleRoute} target='_blank' rel='noopener noreferrer' href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}>
              Ver rotas no Google Maps
            </a>
          </div>

          <div className={styles.informationContainer}>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Contato</h3>
            <p>{phone_number}</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Email</h3>
            <p>{email}</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Atendimento</h3>
            {opening_hours.map((hour: string, index: number) => (
              <p key={index}>{hour}</p>
            ))}
          </div>

          <div className={styles.informationContainer}>
            <h3>Psicólogos(as)</h3>
            <ul>
              {psychologist.map((psychologistName: string, index: number) => (
                <li key={index}>{psychologistName}</li>
              ))}
            </ul>
          </div>
          </motion.main>
        )}
      </AnimatePresence>
      <BottomMenu pageActive=''/>
    </div>
  )
}