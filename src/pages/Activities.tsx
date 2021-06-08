import { useEffect, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { FiSmile, FiFrown } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { Offline, Online } from "react-detect-offline";

import { ActivityItem } from '../components/ActivityItem'
import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import { LoadingStatus } from '../components/LoadingStatus'

import { useLoading } from '../contexts/LoadingIcon'
import { useActivity } from '../contexts/ActivityContext'

import { api } from '../services/api'
import { getMyData, updateMyActivities } from '../services/IndexedDB'

import styles from '../styles/activities.module.scss'

export default function Activities(){
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse, setLoadingTrue, closeLoading } = useLoading()
  // const [ activities, setActivities ] = useState<ActivitiesProps[]>()
  const { activities, setActivitiesState } = useActivity()

  useEffect(()=> { setIsVisible(true) },[])
  setLoadingFalse()

  async function getFromIDB(){
    setLoadingTrue()
    const user: any = await getMyData()
    if(user.myCurrentActivities.message){
      closeLoading()
      return
    }
    setActivitiesState(user.myCurrentActivities)
    closeLoading()
  }
  async function getFromAPI(){
    setLoadingTrue()
    await api.get("/random-activities")
    .then(({data}) => {
      async function handelAPI(){
        if(data.message){
          const user: any = await getMyData()
    
          if(user.myCurrentActivities.message){
            closeLoading()
            return
          }
    
          setActivitiesState(user.myCurrentActivities)
          closeLoading()
          return
        }
        updateMyActivities(data)
        setActivitiesState(data)
        closeLoading()
      }
      handelAPI()
    })
    .catch(err => {
      getFromIDB()
      return
    })
  }

  useEffect(()=>{
    if(activities.length === 0){
      if(navigator.onLine){
        getFromAPI()
        console.log("online")
      } else{
        getFromIDB()
        console.log("offline")
      }
    }
  },[])

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
      {activities.length !== 0 ? (
        activities.map(activity => (
          <ActivityItem 
            key={activity._id}
            title={activity.title} 
            description={activity.description}
            icons={activity.designedTo[0].name}
            content={activity.body}
            id={activity._id}
          />
        ))
      )
      : (
        <div className={styles.dontHaveActivitiesContainer}>
          <FiFrown color="#bbb" size={86}/>
          <span>Não há atividades para realizar.</span>
        </div>
      )
      }
    </section>
  ),[activities])

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