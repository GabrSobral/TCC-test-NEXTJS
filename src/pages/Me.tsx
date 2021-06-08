import { useEffect, useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { AnimatePresence, motion, motionValue, useTransform, useViewportScroll } from 'framer-motion'
import ReactLoading from 'react-loading'

import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'

import { LoadingStatus } from '../components/LoadingStatus';

import { useLoading } from '../contexts/LoadingIcon';

import 'react-circular-progressbar/dist/styles.css';
import styles from '../styles/me.module.scss'
import { FiBook, FiLock, FiLogOut, FiSettings } from 'react-icons/fi';

export default function Me(){
  const history = useRouter()
  
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()
  const [ settingsIsVisible, setSettingsIsVisible ] = useState(false)
  
  const { scrollYProgress } = useViewportScroll()
  const progress = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  setLoadingFalse()

  useEffect(()=>{ setIsVisible(true) },[])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={false}/>
  ),[])

  const memoizedHeaderUser = useMemo(()=>(
    <section className={styles.headerUserContainer}>
      <motion.div 
        className={styles.ImageAndNameContainer}
        initial={{ y: 100, scale: 0.2}}
        animate={{ y: -10, scale: 1}}
      >
        <img src="https://github.com/sobraloser.png" alt="Minha foto de perfil" />
        <span>Gabriel Sobral dos Santos</span>
      </motion.div>
    </section>
  ),[])

  const memoizedAllActivities = useMemo(()=>(
    <div className={styles.allActivitiesComplete}>
      <span>Atividades completas:</span>
      <span>13</span>
    </div>
  ),[])

  const memoizedSettingsButton = useMemo(()=>(
    <div className={styles.configurationsContainer}>
      <button 
        type="button" 
        className={styles.configurationButton} 
        onClick={()=> setSettingsIsVisible(!settingsIsVisible)}
      >
        Configurações
        <FiSettings size={27} color="#534A4A"/>
      </button>

      <AnimatePresence>
      {settingsIsVisible && (
        <motion.div 
          key="SettingsButton"
          className={styles.hiddenButtons}
          initial={{ height: 0 }}
          animate={{ height: "fit-content"}}
          exit={{ height: 0 }}
        >
          <div>
            Alterar questionário
            <FiBook size={20} color="#6f6b6b"/>
          </div>
          <div>
            Alterar senha
            <FiLock size={20} color="#6f6b6b"/>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  ),[settingsIsVisible])

  const memoizedLogoutButton = useMemo(()=>(
    <button type='button' className={styles.logoutButton}>
      Sair
      <FiLogOut size={35} color="#EF4040"/>
    </button>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='me'/>
  ),[])

  return(
    <div className={styles.container}>
      { isLoading && (<LoadingStatus/>) }
      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Me"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {memoizedHeaderUser}

            <section className={styles.BottomInfoContainer}>
              {memoizedAllActivities}
              {memoizedSettingsButton}
              {memoizedLogoutButton}
            </section>
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}