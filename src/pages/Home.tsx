import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'

import styles from '../styles/home.module.scss'
import 'react-circular-progressbar/dist/styles.css';
import { Item } from '../components/ItemButton';

export default function Home(){
  const  [ isVisible, setIsVisible ] = useState(false)

  useEffect(()=> {
    setIsVisible(true)
  },[])
  const percentage = 60;

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
            <section>
              <h2 className={styles.sectionTitle}>Tarefas concluídas hoje</h2>

              <div className={styles.progressBarContainer}>
                <CircularProgressbar 
                  value={percentage} 
                  text={`3/5`}
                  className={styles.circularProgressBar}
                  strokeWidth={3} 
                  styles={buildStyles({
                    pathColor: "#54A06A",
                    textColor: "#434343"
                  })}
                />
              </div>
            </section>
           
            <section>
              <h2 className={styles.sectionTitle}>Descubra</h2>

              <Item
                title="Ajuda nunca é demais"
                description="Ajuda profissional sempre é a melhor escolha"
                icons="medic"
                page="PsychologistList"
              />

              <Item
                title="Respire e se acalme"
                description="Faça exercícios de respiração para se acalmar."
                icons="clock"
                page="Clock"
              />
            </section>
          </motion.main>
        )}
      </AnimatePresence>
      <BottomMenu pageActive='home'/>
    </div>
  )
}