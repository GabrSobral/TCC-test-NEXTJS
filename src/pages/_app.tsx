import Head from 'next/head'
import { useEffect } from 'react'

import { ActivityProvider } from '../contexts/ActivityContext'
import { LoadingProvider } from '../contexts/LoadingIcon'
import { IndexedDB } from '../services/IndexedDB'
import { getMyData } from '../services/IndexedDB'
import { api } from '../services/api'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  async function SyncData(){
    const ActivitiesID = []

    if(navigator.onLine){
      const { 
        _id,
        allAtivitiesFinished,
        myCurrentActivities,
        activityValidity,
        activitiesFinishedToday,
        answers,
        name
      }: any = await getMyData()
      
      myCurrentActivities.map((activity: any) => {
        ActivitiesID.push(activity._id)
      })

      await api.patch('/sync-my-data', {
        _id,
        allAtivitiesFinished,
        myCurrentActivities: ActivitiesID,
        activityValidity,
        activitiesFinishedToday,
        answers,
        name,
      })
    }
  }
  useEffect(()=>{
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
    IndexedDB()
    SyncData()
  },[])

  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Carpe Diem</title>
      </Head>

      <LoadingProvider>
        <ActivityProvider>
          <Component {...pageProps} />
        </ActivityProvider>
      </LoadingProvider>
    </>
  ) 
}

export default MyApp
