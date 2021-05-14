import { FiSmile } from 'react-icons/fi'
import { ActivityItem } from '../components/ActivityItem'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import styles from '../styles/activities.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Activities(){
  const  [ isVisible, setIsVisible ] = useState(false)

  useEffect(()=> {
    setIsVisible(true)
  },[])

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={false}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "fit-content"}}
            exit={{ opacity: 0}}
          >
          <div className={styles.activityTitle}>
            <div className={styles.icon}>
              <FiSmile size={30} color="#fff"/>
            </div>

            <div className={styles.content}>
              <h2>Atividades</h2>
              <p>Aqui você pode encontrar atividades que serão geradas diariamente</p>
            </div>
          </div>
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
        </motion.main>
        )}
      </AnimatePresence>
      <BottomMenu pageActive='activities'/>
    </div>
  )
}