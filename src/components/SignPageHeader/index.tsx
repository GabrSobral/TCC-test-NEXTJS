import { FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Router from 'next/router'

import { useLoading } from '../../contexts/LoadingIcon'

import styles from './style.module.scss'

interface headerProps{
  title : string,
  button?: string,
}

export function SignPageHeader({ title, button } : headerProps){
  const {setLoadingTrue} = useLoading()
  return(
    <header className={styles.container}>
      {button && (
        <button type='button' onClick={() => Router.back()}>
          <FaTimes size={17}/>
        </button>
      )}
      <h1>{title}</h1>

      <Link href={button == 'Entrar' ? '/Login/SignIn' : '/'}>
        <a onClick={setLoadingTrue}>{button}</a>
      </Link>
    </header>
  )
}