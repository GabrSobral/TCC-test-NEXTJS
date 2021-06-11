import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'

import styles from '../../styles/home.module.scss'
import 'react-circular-progressbar/dist/styles.css';
import { Item } from '../../components/ItemButton';
import { LoadingStatus } from '../../components/LoadingStatus';
import { useLoading } from '../../contexts/LoadingIcon';
import { useRouter } from 'next/router';
import { useActivity } from '../../contexts/ActivityContext';
import { getMyData } from '../../services/IndexedDB'

export default function Home(){
  const history = useRouter()
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()
  const [ percentage , setPercentage ] = useState(60)
  const { activitiesToday, setActivitiesTodayState } = useActivity()
  const y = useMotionValue(0)

  async function getMyDataIDB(){
    const data: any = await getMyData()
    setActivitiesTodayState(data.activitiesFinishedToday)
  }
  setLoadingFalse()
  useEffect(()=> { 
    getMyDataIDB()
    setIsVisible(true)
    const percentegeCalculated = Math.round((activitiesToday*100) / 5)
    setPercentage(percentegeCalculated)
  },[activitiesToday])

  useEffect(()=>{
    history.prefetch("/Clock")
  },[])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={false}/>
  ),[])

  const memoizedProgressBar = useMemo(()=>(
    <section>
      <h2 className={styles.sectionTitle}>Tarefas concluídas hoje</h2>

      <div className={styles.progressBarContainer}>
        <CircularProgressbar 
          value={percentage} 
          text={activitiesToday >= 0 ? `${activitiesToday}/5` : "..."}
          className={styles.circularProgressBar}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: "#54A06A",
            textColor: "#434343"
          })}
        />
      </div>
    </section>
  ),[percentage])

  const memoizedPagesControl = useMemo(()=>(
    <section>
      <h2 className={styles.sectionTitle}>Descubra</h2>

      <Item
        title="Ajuda nunca é demais"
        description="Ajuda profissional sempre é a melhor escolha"
        icons="medic"
        page="Psychologist/PsychologistList"
      />

      <Item
        title="Respire e se acalme"
        description="Faça exercícios de respiração para se acalmar."
        icons="clock"
        page="Home/Clock"
      />
    </section>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='home'/>
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
            {memoizedProgressBar}

            {memoizedPagesControl}
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}