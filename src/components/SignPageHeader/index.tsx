import styles from './style.module.scss'
import { FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { useLoading } from '../../contexts/LoadingIcon'

interface headerProps{
  title : string,
  button : string,
}

export function SignPageHeader({ title, button } : headerProps){
  const {setLoadingTrue} = useLoading()
  
  function closeWindow(){
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
  return(
    <header className={styles.container}>
      <button type='button' onClick={closeWindow}>
        <FaTimes size={24}/>
      </button>

    <h1>{title}</h1>

    <Link href={button == 'Entrar' ? '/SignIn' : '/'}>
      <a onClick={setLoadingTrue}>{button}</a>
    </Link>
    </header>
  )
}