import { FiPause, FiSmile, FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'

import { Header } from '../components/header'
import { AnimatePresence, motion } from 'framer-motion'

import styles from '../styles/Clock.module.scss'

export default function Clock(){
  const [ isVisible, setIsVisible ] = useState(false)
  const [ respirationSize, setRespirationSize ] = useState(0)
  const [ isClockStarted, setIsClockStarted ] = useState(false)
  const [ isFinished, setIsFinished ] = useState(false)
  const percentege = 100/2;

  useEffect(()=> {
    setIsVisible(true)
  },[])

  function handleTimeOut(){
    let timer: NodeJS.Timeout;

    if((respirationSize == 100 && isClockStarted && !isFinished) ||
    (respirationSize == 0 && isClockStarted && isFinished)){
     setIsFinished(!isFinished)
     clearTimeout(timer)
     console.log("Mudddddddddddddddddou",isFinished)
 }
 if(isClockStarted && !isFinished){
   timer = setTimeout(()=> {
     clearTimeout(timer)
     setRespirationSize(prevState => prevState + percentege)
     console.log("indo rs")
   }, 500)
   return
 }
 if(isClockStarted && isFinished){
   timer = setTimeout(()=> {
     clearTimeout(timer)
     setRespirationSize(prevState => prevState - percentege)
     console.log("voltando")
   }, 500)
   
   return
 }
  }

  useEffect(()=> {
    let timer : NodeJS.Timeout
    if(isClockStarted && !isFinished){
      timer = setTimeout(()=> {
        setRespirationSize(prevState => prevState + 10)
      },500)

    }
    if(isClockStarted && isFinished){
      timer = setTimeout(()=> {
        setRespirationSize(prevState => prevState - 10)
      },500)
    }
    if(respirationSize >= 100 && isClockStarted){
      setIsFinished(true)
      clearTimeout(timer)
    }
    if(respirationSize <= 0 && isClockStarted){
      setIsFinished(false)
      clearTimeout(timer)
    }
    console.log(respirationSize, "finished:", isFinished)

  },[respirationSize, isClockStarted, isFinished])

  function handleStartClock(){
    setIsClockStarted(!isClockStarted)
  }

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
          <div className={styles.respirationContainer}>
            <h2 className={styles.instruction}>Começar</h2>

            <div className={styles.circleRespirationContainer}>
              <div style={{ width: `${respirationSize}%`, height: `${respirationSize}%` }}/>
            </div>

            <span>00:00</span>

            <button type="button" onClick={handleStartClock}>
              {
                isClockStarted ? (
                  <FiX size={42} color="#fff"/>
                ) : (
                  <FiPause size={42} color="#fff"/>
                )
              }
            </button>
          </div>
        </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}