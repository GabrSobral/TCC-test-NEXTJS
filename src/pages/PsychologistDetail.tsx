import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'

import styles from '../styles/PsychologistDetail.module.scss'

export default function PsychologistList(){
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(()=> {
    setIsVisible(true)
  },[])

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={true}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "fit-content"}}
            exit={{ opacity: 0}}
          >
           

          </motion.main>
        )}
      </AnimatePresence>
      <BottomMenu pageActive=''/>
    </div>
  )
}