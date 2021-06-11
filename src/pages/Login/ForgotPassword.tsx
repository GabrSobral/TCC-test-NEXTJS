import { useEffect, useMemo, useState } from "react";
// import Router from 'next/router'
import { FaEnvelope, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { LoadingStatus } from '../../components/LoadingStatus';
import { useLoading } from '../../contexts/LoadingIcon';
import { Modal } from '../../components/Modal'
import { api } from '../../services/api'

import styles from '../../styles/ForgotPassword.module.scss'

export default function ForgotPassword() {
  const [ email, setEmail ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const { setLoadingTrue, isLoading, setLoadingFalse, closeLoading} = useLoading()

  setLoadingFalse()

  // useEffect(()=> {

  //   Router.prefetch('/Login/Questionnaire')
  //   Router.prefetch('/Login/SignIn')
  //   Router.prefetch('/Home/Home')

  // },[])

  async function sendEmail(){
    setLoadingTrue()

    await api.post('/forgot-password', { email }).then(()=> {
      setIsModalVisible(true)
      closeLoading()
    })
  }
  const memoizedModal = useMemo(()=>(
    <Modal
      title="Enviado..."
      description="Verifique a sua caixa de email principal ou spam."
      keyModal="EmailSend"
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      yesAndNoButtons={false}
      destinyPage="Login/SignIn"
    />
  ),[isModalVisible])

  const memoizedHeader = useMemo(()=> (
    <SignPageHeader title='Senha' button='Entrar'/>
  ),[])

  const memoizedTitle = useMemo(()=> (
    <span className={styles.title}>Insira seu email para <br/> sabermos quem é você.</span>
  ),[])

  const memoizedEmail = useMemo(()=> (
    <div className={!email ? styles.inputContainer : styles.inputContainerActive}>
      <span>Email</span>
      <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
      <FaEnvelope size={20} className={styles.icon}/>
    </div>
  ),[ email ]) 

  const memoizedMessage = useMemo(()=> (
    <span className={styles.warningText}>{message}</span>
  ),[message])
  
  const memoizedButton = useMemo(()=> (
    <button type='button' onClick={sendEmail} disabled={email ? false : true}>
      Confirmar
      <FaCheck size={24}/>
    </button>
  ),[ email ])

  return (
    <div className={styles.wrapper}>
      {memoizedHeader}
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <form className={styles.formContainer}>
          {isLoading && ( <LoadingStatus/>)}
          
          {memoizedModal}

          {memoizedTitle}
          {memoizedEmail}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}
