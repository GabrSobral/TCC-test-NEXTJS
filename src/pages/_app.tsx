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
    <>
      <Head>
        <title>Carpe Diem</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="HandheldFriendly" content="true" />

        <meta name='application-name' content='PWA TCC' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PWA App' />
        <meta name='description' content='Best PWA App in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />

        <meta name='theme-color' content='#ffffff' />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff"/>

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://yourdomain.com' />
        <meta name='twitter:title' content='PWA App' />
        <meta name='twitter:description' content='Best PWA App in the world' />
        <meta name='twitter:image' content='https://yourdomain.com/static/icons/android-chrome-192x192.png' />
        <meta name='twitter:creator' content='@DavidWShadow' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='PWA TCC' />
        <meta property='og:description' content='Best PWA App in the world' />
        <meta property='og:site_name' content='PWA App' />
        <meta property='og:url' content='https://yourdomain.com' />
        <meta property='og:image' content='https://yourdomain.com/static/icons/apple-touch-icon.png' />
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
