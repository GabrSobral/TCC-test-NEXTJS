import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document{
  render(){
    return(
      <Html>
        <Head>
          <title>Carpe Diem</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="HandheldFriendly" content="true" />

          <meta name='application-name' content='Carpe Diem' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Carpe Diem' />
          <meta name='description' content='Best PWA App in the world' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />

          <meta name='theme-color' content='#ffffff' />
          <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff"/>

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:title' content='PWA App' />
          <meta name='twitter:description' content='Best PWA App in the world' />
          <meta name='twitter:creator' content='@DavidWShadow' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='PWA TCC' />
          <meta property='og:description' content='Best PWA App in the world' />
          <meta property='og:site_name' content='PWA App' />
          <meta property='og:url' content='https://yourdomain.com' />
          <meta property='og:image' content='https://yourdomain.com/static/icons/apple-touch-icon.png' />

          <link rel="manifest" href="/manifest.json"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>

          <link rel='manifest' href='/static/manifest.json' />
          <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
      
    )
  }
}