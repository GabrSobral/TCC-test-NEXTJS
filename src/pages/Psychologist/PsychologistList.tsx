import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { LoadingStatus } from '../../components/LoadingStatus'
import { PsychologistItem } from '../../components/PsychologistItem'
import PsychologistMap from '../../components/PsychologistMap/index'

import { useLoading } from '../../contexts/LoadingIcon'
import { api } from '../../services/api'

import styles from '../../styles/PsychologistList.module.scss'
import { Clinic } from '../../types/Clinic'

export default function PsychologistList(){
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()
  const [ optionIsActive, setOptionIsActive ] = useState(true)
  const [ clinics, setClinics ] = useState<Clinic[]>([])

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

  const memoizedOptionMapAndTitle = useMemo(()=>(
    <>
      { optionIsActive && (<h2>Consultórios perto de você</h2>) }
      <div className={styles.optionMap}>
        <button type="button" className={optionIsActive ? styles.active: ""} onClick={()=> setOptionIsActive(true)}>Lista</button>
        <button type="button" className={!optionIsActive ? styles.active: ""} onClick={()=> setOptionIsActive(false)}>Mapa</button>
      </div>
    </>
  ), [optionIsActive])

  const memoizedAllClinics = useMemo(()=>(
    <section className={styles.AllClinics}>
      { clinics.map((clinic: Clinic) => (
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
  ),[clinics])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive=''/>
  ),[])

  return(
    <div className={styles.container}>
      { isLoading && (<LoadingStatus/>) }
      {memoizedHeader}

      <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.main
          key="Activities"
          initial={{ opacity: 0, height: 0, y: 50 }}
          animate={{ opacity: 1, height: "fit-content", y: 0}}
          exit={{ opacity: 0}}
        >
          {memoizedOptionMapAndTitle}
          {optionIsActive ? 
            memoizedAllClinics : ( 
              <PsychologistMap
                latitude={-20}
                longitude={-46}
                isChangeable={true}
                content={clinics}
              />
            )}
        </motion.main>
      )}
      </AnimatePresence>

      {memoizedBottomMenu}
    </div>
  )
}