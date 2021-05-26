import { AnimatePresence, AnimateSharedLayout, motion, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FiHeadphones, FiTrash, FiCheck, FiBook } from 'react-icons/fi'

import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import { LoadingStatus } from '../components/LoadingStatus'
import { Player } from '../components/Player'
import { useLoading } from '../contexts/LoadingIcon'

import Medic from '../images/medic.svg'
import Clock from '../images/clock.svg'
import Gym from '../images/Gym.svg'
import Games from '../images/games.svg'
import Food from '../images/food.svg'
import Respiration from '../images/respiration.svg'
import Meditation from '../images/meditation.svg'

import styles from '../styles/activityDetail.module.scss'
import { api } from '../services/api'
import { finishMyActivity } from '../services/IndexedDB'
import { useActivity } from '../contexts/ActivityContext'

const icon = {
  Musica: <FiHeadphones size={30} color="#fff"/>,
  Exercicios: <img src={Gym} alt="" style={{ width: 30, height: 30 }}/>,
  Games : <img src={Games} alt="" style={{ width: 30, height: 30 }}/>,
  Meditacao: <img src={Meditation} alt="" style={{ width: 30, height: 30 }}/>,
  Culinaria: <img src={Food} alt="" style={{ width: 30, height: 30 }}/>,
  Respiracao: <img src={Respiration} alt="" style={{ width: 30, height: 30 }}/>,
  Estudos: <FiBook size={30} color="#fff"/>,
  medic : <img src={Medic} alt="" style={{ width: 30, height: 30 }}/>,
  clock : <img src={Clock} alt="" style={{ width: 30, height: 30 }}/>
}

export default function ActivitiyDetails(){
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isModalSuccessVisible, setIsModalSuccessVisible ] = useState(false)
  const [ isModalRemoveVisible, setIsModalRemoveVisible ] = useState(false)
  const { isLoading, setLoadingFalse, setLoadingTrue } = useLoading()
  const { activities, setActivitiesState, setActivitiesTodayState } = useActivity()

  
  const router = useRouter()
  const { title, description, icons, content, id } = router.query

  useEffect(()=> {
    setIsVisible(true)
  },[])
  setLoadingFalse()

  async function Finish(){
    const newActivities = activities
    setLoadingTrue()

    await api.patch(`/my-activities/${id}`)
    finishMyActivity(String(id))

    newActivities.map((activity, index) => {
      if(activity._id === id){
        newActivities.splice(index, 1)
      }
    })
    setActivitiesTodayState(5 - newActivities.length)
    setActivitiesState(newActivities)
    setIsModalSuccessVisible(true)
  }

  async function ExcludeActivity(){
    const newActivities = activities
    setLoadingTrue()

    await api.patch(`/delete-my-activitiy/${id}`)
    finishMyActivity(String(id))

    newActivities.map((activity, index) => {
      if(activity._id === id){
        newActivities.splice(index, 1)
      }
    })
    setActivitiesState(newActivities)
    setIsModalRemoveVisible(false)
    setTimeout(() => router.push('/Activities'), 300)
  }

  function ModalSuccess(){
    return(
      <motion.div className={styles.modalBackground}
        layout
        key="modalSuccessBackground"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
      >
        <AnimatePresence key="APSuccess">
          <motion.div className={styles.modalContainer}
            layout
            key="modalSuccess"
            animate={{
              height : [0, 320],
              width : ["0%", "90%"], 
              opacity:[0, 1]}}
            exit={{ height: 0, width : "0%"}}
            transition={{ 
              delay: 0.25,
              bounce: 0.5, 
              type: "spring", 
              duration: 0.3 }}
          >
          <motion.svg id="Capa_1" enable-background="new 0 0 512 512" height="120" viewBox="0 0 512 512" width="120" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m359.801 429.3-103.801-30-103.801 30c-.899 1.8-1.199 3.6-1.199 5.7v62h210v-62c0-2.1-.3-3.9-1.199-5.7z" fill="#646d73"/></g><path d="m361 497v-62c0-2.1-.3-3.9-1.199-5.7l-103.801-30v97.7z" fill="#474f54"/><path d="m497 30h-76.645c.132-5.067.645-9.84.645-15 0-8.401-6.599-15-15-15h-300c-8.401 0-15 6.599-15 15 0 5.16.513 9.933.643 15h-76.643c-8.291 0-15 6.709-15 15v37.998c0 83.754 67.092 151.791 149.773 156.171 17.225 23.716 37.668 41.316 60.927 51.231-3.6 72.9-45.3 123.6-55.199 134.101-1.501 1.199-2.701 2.999-3.301 4.799h207.601c-.601-1.8-1.8-3.6-3.301-4.799-10.2-10.501-51.6-60.901-55.2-134.101 23.264-9.917 43.83-27.521 61.069-51.246 82.61-4.451 149.631-72.449 149.631-156.156v-37.998c0-8.291-6.709-15-15-15zm-467 52.998v-22.998h62.93c3.893 49.578 14.644 102.086 37.24 146.708-56.64-12.755-100.17-63.265-100.17-123.71zm452 0c0 60.414-43.491 110.9-100.089 123.684 22.417-44.621 33.228-96.621 37.159-146.682h62.93z" fill="#fed843"/><path d="m497 30h-76.645c.132-5.067.645-9.84.645-15 0-8.401-6.599-15-15-15h-150v429.3h103.801c-.601-1.8-1.8-3.6-3.301-4.799-10.2-10.501-51.6-60.901-55.2-134.101 23.264-9.917 43.83-27.521 61.069-51.246 82.61-4.451 149.631-72.449 149.631-156.156v-37.998c0-8.291-6.709-15-15-15zm-15 52.998c0 60.414-43.491 110.9-100.089 123.684 22.419-44.621 33.23-96.621 37.159-146.682h62.93z" fill="#fabe2c"/><g id="Trophy_31_"><g><path d="m279.936 190.796-23.936-12.437-23.936 12.437c-5.01 2.578-11.133 2.153-15.732-1.172-4.6-3.34-6.914-8.994-5.977-14.59l4.395-26.646-19.189-18.94c-4.177-4.072-5.454-10.109-3.75-15.322 1.758-5.391 6.416-9.346 12.041-10.195l26.66-4.014 12.07-24.126c5.098-10.166 21.738-10.166 26.836 0l12.07 24.126 26.66 4.014c5.625.85 10.283 4.805 12.041 10.195 1.758 5.405.322 11.338-3.75 15.322l-19.189 18.94 4.395 26.646c.938 5.596-1.377 11.25-5.977 14.59-4.569 3.311-10.681 3.8-15.732 1.172z" fill="#fabe2c"/></g></g><path d="m279.936 190.796c5.052 2.628 11.164 2.139 15.732-1.172 4.6-3.34 6.914-8.994 5.977-14.59l-4.395-26.646 19.189-18.94c4.072-3.984 5.508-9.917 3.75-15.322-1.758-5.391-6.416-9.346-12.041-10.195l-26.66-4.014-12.07-24.126c-2.549-5.083-7.983-7.625-13.418-7.625v110.193z" fill="#ff9100"/><g><path d="m376 512h-240c-8.291 0-15-6.709-15-15s6.709-15 15-15h240c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#474f54"/></g><path d="m376 482h-120v30h120c8.291 0 15-6.709 15-15s-6.709-15-15-15z" fill="#32393f"/></g></motion.svg>
            <motion.div>
              <motion.h2>Parabéns!</motion.h2>
              <motion.p>Você conseguiu realizar uma tarefa, isso é ótimo!</motion.p>
            </motion.div>

            <motion.button 
              type="button" 
              onClick={() => {
                setIsModalSuccessVisible(false)
                setTimeout(() => router.push('/Activities'), 270)
              }}
              >
              Fechar
            </motion.button>
          </motion.div>


        </AnimatePresence>
      </motion.div>
    )
  }

  function ModalExclude(){
    return(
      <motion.div className={styles.modalBackground}
        layout
        key="modalExcludeBackground"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
      >
        <AnimatePresence key="APExclude">
          <motion.div className={styles.modalContainer}
            layout
            key="modalExclude"
            animate={{
              height : [0, 320],
              width : ["0%", "90%"], 
              opacity:[0, 1]}}
            exit={{ height: 0, width : "0%"}}
            transition={{ 
              delay: 0.25,
              bounce: 0.5, 
              type: "spring", 
              duration: 0.3 }}
          >
          <motion.svg enable-background="new 0 0 512 512" height="120" viewBox="0 0 512 512" width="120" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m415.158 85.758c-.268.087-93.932 27.686-94.198 27.777-10.041 3.493-16.788 12.983-16.788 23.614v42.223c0 8.285 6.716 15.001 15.001 15.001h114.008c8.285 0 15.001-6.716 15.001-15.001v-69.935c0-17.077-16.817-29.172-33.024-23.679z" fill="#ff5e94"/><path d="m160.161 164.371v282.624c0 35.844 29.161 65.005 65.005 65.005h158.012c35.844 0 65.005-29.161 65.005-65.005 0-15.734 0-274.731 0-282.624z" fill="#9dcfff"/><path d="m304.172 164.371v347.629h79.006c35.843 0 65.005-29.162 65.005-65.005v-282.624z" fill="#72bbff"/><g fill="#5a5a5a"><path d="m237.431 233.376c-8.285 0-15.001 6.716-15.001 15.001v179.616c0 8.285 6.716 15.001 15.001 15.001s15.001-6.716 15.001-15.001v-179.616c0-8.285-6.717-15.001-15.001-15.001z"/><path d="m304.171 233.376c-8.285 0-15.001 6.716-15.001 15.001v179.616c0 8.285 6.716 15.001 15.001 15.001s15.001-6.716 15.001-15.001v-179.616c0-8.285-6.716-15.001-15.001-15.001z"/></g><g fill="#444"><path d="m319.172 248.381v179.613c0 8.281-6.72 15.001-15.001 15.001v-209.615c8.281 0 15.001 6.71 15.001 15.001z"/><path d="m370.912 233.376c-8.285 0-15.001 6.716-15.001 15.001v179.616c0 8.285 6.716 15.001 15.001 15.001s15.001-6.716 15.001-15.001v-179.616c0-8.285-6.716-15.001-15.001-15.001z"/></g><path d="m192.17 18.07s0 0-.01 0c-15.336-9.588-36.016-7.793-49.46 5.65v.01l-27.58 27.57-27.58 27.58c-15.6 15.6-15.6 40.98 0 56.57l14.15 14.15 20.31-2.1.9-19.12-14.14-14.14c-3.9-3.9-3.9-10.25 0-14.14l27.58-27.58 27.57-27.58h.01c3.689-3.689 10.025-4.116 14.13-.01l14.15 14.15 18.55-3.08 2.67-18.13c-14.806-14.806-16.41-16.818-21.25-19.8z" fill="#5a5a5a"/><path d="m192.17 18.07s0 0-.01 0c-15.297-9.564-35.968-7.831-49.46 5.66l-27.58 27.57 21.22 21.22 27.58-27.58c3.686-3.686 10.017-4.124 14.13-.01l14.15 14.15 21.22-21.21c-15.291-15.291-16.162-16.574-21.25-19.8z" fill="#444"/><path d="m317.418 37.108-26.872-26.872c-13.647-13.647-35.853-13.647-49.501 0l-166.992 166.991c-13.647 13.647-13.647 35.853 0 49.501l26.872 26.872c5.857 5.858 15.356 5.859 21.214 0l195.279-195.278c5.858-5.858 5.858-15.356 0-21.214z" fill="#3ba9ff"/><path d="m290.545 10.236 26.872 26.872c5.855 5.855 5.862 15.352 0 21.215l-97.637 97.637-62.23-62.23 83.494-83.494c13.648-13.648 35.853-13.648 49.501 0z" fill="#0081ff"/></g></g></motion.svg>
            <motion.div>
              <motion.h2>Oh não...</motion.h2>
              <motion.p>Você tem certeza de que deseja excluir essa tarefa?</motion.p>
            </motion.div>

            <motion.div className={styles.removeModalButton}>
                <motion.button type="button" onClick={() => setIsModalRemoveVisible(false)}>
                  Não
                </motion.button>

                <motion.button 
                  type="button" 
                  onClick={ExcludeActivity}>
                  Sim
                </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }

  const memoizedDetails = useMemo(()=>(
    <>
      <div className={styles.activityItem}>
        <div className={styles.icon}>
          {icon[String(icons)]}
        </div>

        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div 
        className={styles.ActivityDescription} 
        dangerouslySetInnerHTML={{
          __html: content as string
        }}
      >
      </div>
    </>
  ),[])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={true}/>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='activities'/>
  ),[])

  const memoizedButtonsControl = useMemo(()=>(
    <div className={styles.buttons}>
      <button type="button" onClick={() => setIsModalRemoveVisible(true)}>
        <FiTrash size={28} color="#fff"/>
        Excluir
      </button>

      <button type="button" onClick={Finish}>
        <FiCheck size={28} color="#fff"/>
        Terminei
      </button>
    </div>
  ),[])

  const memoizedPlayer = useMemo(()=>(
    <Player/>
  ),[])

  return(
    <div className={styles.container}>
        {memoizedHeader}

        {isModalSuccessVisible && (
        <AnimatePresence exitBeforeEnter>
            <ModalSuccess key="ModalSuccessAP"/>
        </AnimatePresence>
        )}

        {isModalRemoveVisible && (
        <AnimatePresence exitBeforeEnter>
            <ModalExclude key="ModalExcludeAP"/>
        </AnimatePresence>
        )}

        <AnimateSharedLayout type="crossfade">
         
          <AnimatePresence exitBeforeEnter>
            {isVisible && (

              <motion.main
                layout
                key="ActivityDetails"
                initial={{ opacity: 0, height: 0, y: 50 }}
                animate={{ opacity: 1, height: "fit-content", y: 0}}
                exit={{ opacity: 0, height: 0}}
              >
                {isLoading && (<LoadingStatus/>) }
                
                {memoizedDetails}

                {memoizedPlayer}
                {memoizedButtonsControl}
              </motion.main>
            )}
          </AnimatePresence>
          {memoizedBottomMenu}
        </AnimateSharedLayout>
    </div>
  )
}