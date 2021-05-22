import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document{
  render(){
    return(
      <Html>
        <Head>
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