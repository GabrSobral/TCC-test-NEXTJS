import { FiSmile } from 'react-icons/fi'
import { ActivityItem } from '../components/ActivityItem'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import styles from '../styles/activities.module.scss'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { LoadingStatus } from '../components/LoadingStatus'
import { useLoading } from '../contexts/LoadingIcon'

export default function Activities(){
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()
  const y = useMotionValue(0)

  useEffect(()=> { setIsVisible(true) },[])
  setLoadingFalse()

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={false}/>
  ),[])

  const memoizedMainTitle = useMemo(()=> (
    <div className={styles.activityTitle}>
      <div className={styles.icon}>
        <FiSmile size={30} color="#fff"/>
      </div>

      <div className={styles.content}>
        <h2>Atividades</h2>
        <p>Aqui você pode encontrar atividades que serão geradas diariamente</p>
      </div>
    </div>
  ),[])

  const memoizedAllActivities = useMemo(()=>(
    <section className={styles.allActivities}>
      <ActivityItem 
        title="Ouça e relaxe..." 
        description="Ouça uma música relaxante, para esvaziar a sua mente." 
        icons="music"
      />

      <ActivityItem 
        title="Exercite-se..." 
        description="Ouça uma música relaxante, para esvaziar a sua mente." 
        icons="gym"
      />
    </section>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='activities'/>
  ),[])

  return(
    <div className={styles.container}>
      
      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {isLoading && (
              <LoadingStatus/>
            )}
            {memoizedMainTitle}
            {memoizedAllActivities}
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}