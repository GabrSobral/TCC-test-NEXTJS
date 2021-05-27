import Head from 'next/head'
import { useEffect } from 'react'
import { ActivityProvider } from '../contexts/ActivityContext'
import { LoadingProvider } from '../contexts/LoadingIcon'
import { IndexedDB } from '../services/IndexedDB'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
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
  },[])
  return(
      <LoadingProvider>
        <ActivityProvider>
          <Component {...pageProps} />
        </ActivityProvider>
      </LoadingProvider>
  ) 
}

export default MyApp
