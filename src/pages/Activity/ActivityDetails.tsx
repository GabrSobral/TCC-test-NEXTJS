import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FiHeadphones, FiTrash, FiCheck, FiBook } from 'react-icons/fi'

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { LoadingStatus } from '../../components/LoadingStatus'
import { Player } from '../../components/Player'
import { useLoading } from '../../contexts/LoadingIcon'

import Medic from '../../images/medic.svg'
import Clock from '../../images/clock.svg'
import Gym from '../../images/Gym.svg'
import Games from '../../images/games.svg'
import Food from '../../images/food.svg'
import Respiration from '../../images/respiration.svg'
import Meditation from '../../images/meditation.svg'

import styles from '../../styles/activityDetail.module.scss'
import { api } from '../../services/api'
import { deleteMyActivity, finishMyActivity } from '../../services/IndexedDB'
import { useActivity } from '../../contexts/ActivityContext'
import { Modal } from '../../components/Modal'

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
  const { activities, setActivitiesState, setActivitiesTodayState, activitiesToday } = useActivity()

  
  const router = useRouter()
  const { title, description, icons, content, id } = router.query

  useEffect(()=> { setIsVisible(true) },[])
  setLoadingFalse()

  async function Finish(){
    const newActivities = activities
    setLoadingTrue()

    if(navigator.onLine){
      const {data} = await api.patch(`/my-activities/${id}`)
      finishMyActivity(String(id))

      newActivities.map((activity, index) => {
        if(activity._id === id){
          newActivities.splice(index, 1)
        }
      })
      setActivitiesTodayState(data.activitiesFinishedToday)
      setActivitiesState(newActivities)
      setIsModalSuccessVisible(true)
    } else {
      const user: any = finishMyActivity(String(id))
      newActivities.map((activity, index) => {
        if(activity._id === id){
          newActivities.splice(index, 1)
        }
      })
      setActivitiesTodayState(user.activitiesFinishedToday)
      setActivitiesState(newActivities)
      setIsModalSuccessVisible(true)
    }
  }
  async function ExcludeActivity(){
    const newActivities = activities
    setLoadingTrue()

    await api.patch(`/delete-my-activitiy/${id}`)
    deleteMyActivity(String(id))

    newActivities.map((activity, index) => {
      if(activity._id === id){
        newActivities.splice(index, 1)
      }
    })
    setActivitiesState(newActivities)
    setIsModalRemoveVisible(false)
    setTimeout(() => router.push('/Activity/Activities'), 300)
  }
  
  const MemoizedModalExclude = useMemo(()=>(
    <Modal
      title="Oh não..."
      description="Você tem certeza de que deseja excluir essa tarefa?"
      keyModal="Exclude"
      isVisible={isModalRemoveVisible}
      setIsVisible={setIsModalRemoveVisible}
      yesAndNoButtons={true}
      confirmFunction={ExcludeActivity}
      image="Exclude"
      destinyPage="Activity/Activities"
    />
  ),[isModalRemoveVisible])

  const MemoizedModalSuccess = useMemo(()=>(
    <Modal
      title="Parabéns!"
      description="Você conseguiu realizar uma tarefa, isso é ótimo!"
      keyModal="Success"
      isVisible={isModalSuccessVisible}
      setIsVisible={setIsModalSuccessVisible}
      yesAndNoButtons={false}
      image="Success"
      destinyPage="Activity/Activities"
    />
  ),[isModalSuccessVisible])

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

        {isModalSuccessVisible && (MemoizedModalSuccess)}

        {isModalRemoveVisible && (MemoizedModalExclude)}

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