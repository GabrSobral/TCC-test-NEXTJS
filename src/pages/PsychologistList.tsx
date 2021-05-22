import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import { LoadingStatus } from '../components/LoadingStatus'
import { PsychologistItem } from '../components/PsychologistItem'
import { useLoading } from '../contexts/LoadingIcon'
import styles from '../styles/PsychologistList.module.scss'

export default function PsychologistList(){
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()

  const y = useMotionValue(0)

  setLoadingFalse()
  useEffect(()=> { setIsVisible(true) },[])

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
          <PsychologistItem/>
          <PsychologistItem/>
          <PsychologistItem/>
        </section>
       </motion.main>
      )}
    </AnimatePresence>
  ),[isVisible])

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