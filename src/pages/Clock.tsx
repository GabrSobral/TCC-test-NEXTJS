import { useEffect, useState } from 'react'

import { Header } from '../components/header'
import { AnimatePresence, motion } from 'framer-motion'

import styles from '../styles/Clock.module.scss'
import { Respiration } from '../components/Respiration'

export default function Clock(){
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(()=> {
    setIsVisible(true)
  },[])

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={true}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <Respiration/>
        )}
      </AnimatePresence>
    </div>
  )
}