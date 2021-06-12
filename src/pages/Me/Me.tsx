import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useTransform, useViewportScroll } from 'framer-motion'
import { FiBook, FiLock, FiLogOut, FiSettings } from 'react-icons/fi';
import { format } from 'date-fns'

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { LoadingStatus } from '../../components/LoadingStatus';
import { Modal } from '../../components/Modal'

import { useLoading } from '../../contexts/LoadingIcon';
import { logout } from '../../services/auth';
import { getMyData } from '../../services/IndexedDB';
import { UserProps } from '../../types/User';

import 'react-circular-progressbar/dist/styles.css';
import styles from '../../styles/me.module.scss'
import Link from 'next/link';

export default function Me(){
  const history = useRouter()
  
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingFalse } = useLoading()
  const [ settingsIsVisible, setSettingsIsVisible ] = useState(false)
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)
  const [ user, setUser ] = useState<UserProps>()
  
  const { scrollYProgress } = useViewportScroll()
  const progress = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  setLoadingFalse()

  const FetchMydata = useCallback(async ()=> {
    const myData: UserProps = await getMyData()
    const formattedDate = format(new Date(myData.createdAt), 'dd/MM/yyyy')
    myData.createdAt = formattedDate
    setUser(myData)
  }, [])
 
  useEffect(()=>{ 
    setIsVisible(true) 
    FetchMydata()
  },[])

  function Logout(){
    logout()
    history.push("/Login/SignIn")
    return
  }

  const memoizedModalLogout = useMemo(()=>(
    <Modal
      title={`Volte sempre ${': )'}`}
      description="Você tem certeza de que deseja sair do nosso app?"
      keyModal="Logout"
      isVisible={isLogoutModalVisible}
      setIsVisible={setIsLogoutModalVisible}
      yesAndNoButtons={true}
      confirmFunction={Logout}
    />
  ),[isLogoutModalVisible])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={false}/>
  ),[])

  const memoizedHeaderUser = useMemo(()=>(
    <section className={styles.headerUserContainer}>
      <div className={styles.ImageAndNameContainer}>
        <img src="https://github.com/sobraloser.png" alt="Minha foto de perfil" />
        <span>{user?.name}</span>
      </div>

      <span className={styles.registeredAt}>Registrado em: {user?.createdAt}</span>
    </section>
  ),[user])

  const memoizedAllActivities = useMemo(()=>(
    <div className={styles.allActivitiesComplete}>
      <span>Atividades completas:</span>
      <span>{user?.allActivitiesFinished}</span>
    </div>
  ),[user])

  const memoizedSettingsButton = useMemo(()=>(
    <div className={styles.configurationsContainer}>
      <button 
        type="button" 
        className={styles.configurationButton} 
        onClick={()=> setSettingsIsVisible(!settingsIsVisible)}
      >
        Configurações
        <FiSettings size={27} color="#534A4A"/>
      </button>

      <AnimatePresence>
      {settingsIsVisible && (
        <motion.div 
          key="SettingsButton"
          className={styles.hiddenButtons}
          initial={{ height: 0 }}
          animate={{ height: "fit-content"}}
          exit={{ height: 0 }}
        >
          <Link href="/Me/ChangeQuestionnaire">
            <button type="button">
              Alterar questionário
              <FiBook size={20} color="#6f6b6b"/>
            </button>
          </Link>
          
          <Link href="/Me/ChangePassword">
            <button type="button">
              Alterar senha
              <FiLock size={20} color="#6f6b6b"/>
            </button>
          </Link>

        </motion.div>
      )}
      </AnimatePresence>
    </div>
  ),[settingsIsVisible])

  const memoizedLogoutButton = useMemo(()=>(
    <button type='button' className={styles.logoutButton} onClick={()=> setIsLogoutModalVisible(true)}>
      Sair
      <FiLogOut size={35} color="#EF4040"/>
    </button>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='me'/>
  ),[])

  return(
    <div className={styles.container}>
      { isLoading && (<LoadingStatus/>) }
      { memoizedModalLogout }

      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Me"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {memoizedHeaderUser}

            <section className={styles.BottomInfoContainer}>
              {memoizedAllActivities}
              {memoizedSettingsButton}
              {memoizedLogoutButton}
            </section>
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}