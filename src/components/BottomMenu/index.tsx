import styles from './styles.module.scss'
import { FiList, FiHome, FiUser} from 'react-icons/fi'
import Link from 'next/link'
import { useLoading } from '../../contexts/LoadingIcon'
import { useRouter } from 'next/router'
import { logout } from '../../services/auth'

interface TabsProps{
  pageActive : string
}

export function BottomMenu({ pageActive }: TabsProps){
  const { setLoadingTrue } = useLoading()
  const history = useRouter()

  function navegate(page: string){
    switch(page){
      case "activities" : {
        if(pageActive !== "activities"){
          history.push("/Activities")
          setLoadingTrue();
        } break;
      }
      case "home" : {
        if(pageActive !== "home"){
          history.push("/Home")
          setLoadingTrue();
        } break;
      }
      case "me" : {
        if(pageActive !== "me"){
          history.push("/Activities")
          setLoadingTrue();
        } break;
      }
    }
  }
  function Logout(){
    logout()
    history.push("/SignIn")
    return
  }
  return(
    <footer className={styles.container}>
        <button type='button' className={pageActive === "activities" ? styles.active : ''} onClick={()=> navegate("activities")}>
          <FiList size={30} color={'#fff'}/>
          Atividades
        </button>

        <button type='button' className={pageActive === "home" ? styles.active : ''} onClick={()=> navegate("home")}>
          <FiHome size={30} color={'#fff'}/>
          home
        </button>

        <button type='button' className={pageActive === "me" ? styles.active : ''} onClick={Logout}>
          <FiUser size={30} color={'#fff'}/>
          Eu
        </button>
    </footer>
  )
}