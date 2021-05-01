import styles from './styles.module.scss'
import { FiList, FiHome, FiUser} from 'react-icons/fi'
import Link from 'next/link'

interface TabsProps{
  pageActive : string
}

export function BottomMenu({ pageActive }: TabsProps){
  return(
    <footer className={styles.container}>
      <Link href="/Activities">
        <button type='button' className={pageActive === "activities" ? styles.active : ''}>
          <FiList size={30} color={'#fff'}/>
          Atividades
        </button>
      </Link>

      <Link href="/Activities">
        <button type='button' className={pageActive === "home" ? styles.active : ''}>
          <FiHome size={30} color={'#fff'}/>
          home
        </button>
      </Link>

      <Link href="/Activities">
        <button type='button' className={pageActive === "me" ? styles.active : ''}>
          <FiUser size={30} color={'#fff'}/>
          Eu
        </button>
      </Link>
    </footer>
  )
}