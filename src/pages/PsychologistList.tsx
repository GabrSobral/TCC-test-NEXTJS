import { addScaleCorrection, AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import { LoadingStatus } from '../components/LoadingStatus'
import { PsychologistItem } from '../components/PsychologistItem'
import { useLoading } from '../contexts/LoadingIcon'
import { api } from '../services/api'
import styles from '../styles/PsychologistList.module.scss'

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

export default function PsychologistList(){
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()
  const [ clinics, setClinics ] = useState<Clinics[]>([])

  const y = useMotionValue(0)

  setLoadingFalse()
  async function fetchClinics(){
    const { data } = await api.get('/clinics')
    setClinics(data)
  }
  useEffect(()=> { 
    fetchClinics()
    setIsVisible(true) 
  },[])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={true}/>
  ),[])

  const memoizedAllClinics = useMemo(()=>(
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.main
          key="Activities"
          initial={{ opacity: 0, height: 0, y: 50 }}
          animate={{ opacity: 1, height: "fit-content", y: 0}}
          exit={{ opacity: 0}}
        >
        <h2>Consultórios perto de você</h2>
        <section className={styles.AllClinics}>
          { clinics.map((clinic: Clinics) => (
            <PsychologistItem
            key={clinic._id}
              _id={clinic._id}
              opening_hours={clinic.opening_hours}
              psychologist={clinic.psychologist}
              name={clinic.name}
              description={clinic.description}
              phone_number={clinic.phone_number}
              email={clinic.email}
              latitude={clinic.latitude}
              longitude={clinic.longitude}
            />
          )) }
        </section>
       </motion.main>
      )}
    </AnimatePresence>
  ),[clinics])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive=''/>
  ),[])

  return(
    <div className={styles.container}>
      { isLoading && (<LoadingStatus/>) }

      {memoizedHeader}
      {memoizedAllClinics}
      {memoizedBottomMenu}
    </div>
  )
}