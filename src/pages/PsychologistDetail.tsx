import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import { LoadingStatus } from '../components/LoadingStatus'
import LeafletMap from '../components/Map'

import styles from '../styles/PsychologistDetail.module.scss'

export default function PsychologistList(){
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isLoadingStatus, setIsLoadingStatus ] = useState(false)
  const y = useMotionValue(0)

  useEffect(()=> {
    setIsVisible(true)
  },[])

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
              <LeafletMap/>
            </div> 
            <button type="button">
              Ver rota no Google Maps
            </button>
          </div>

          <div className={styles.informationContainer}>
            <h2>Consultório Teste</h2>
            <p>Atendemos jovens e adultos, que sofrem com depressão e ansiedade.</p>
            <p>Estamos na rua Conselheiro Nébias 32, estamos prontos para ajudá-lo.</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Contato</h3>
            <p>(13)3227-7432</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Email</h3>
            <p>Consultorio_teste@teste.com</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Atendimento</h3>
            <p>Das 11h às 18h de segunda à sexta.</p>
            <p>Das 13h às 16h aos finais de semana.</p>
          </div>

          <div className={styles.informationContainer}>
            <h3>Psicólogos(as)</h3>
            <ul>
              <li>Psicoóga Thaíssa Ribeiro</li>
              <li>Psicólogo Marcelo Rodrigues Cardoso</li>
            </ul>
          </div>
          </motion.main>
        )}
      </AnimatePresence>
      <BottomMenu pageActive=''/>
    </div>
  )
}