import { useEffect, useMemo, useState } from "react";
import Router, { useRouter } from 'next/router'
import { FaLock, FaUnlock, FaSave } from 'react-icons/fa'
import { motion } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { LoadingStatus } from '../../components/LoadingStatus';
import { useLoading } from '../../contexts/LoadingIcon';
import { Modal } from '../../components/Modal'
import { api } from '../../services/api'

import styles from '../../styles/ForgotPassword.module.scss'

export default function ForgotPassword() {
  const [ newPassword, setNewPassword ] = useState<string>('')
  const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('')

  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)

  const history = useRouter()
  const { email, token } = history.query

  const { setLoadingTrue, isLoading, setLoadingFalse, closeLoading} = useLoading()

  setLoadingFalse()

  useEffect(()=> {
    Router.prefetch('/Login/Questionnaire')
    Router.prefetch('/Login/SignIn')
    Router.prefetch('/Home/Home')
  },[])

  async function resetPassword(){
    if(newPassword !== confirmNewPassword){
      setMessage("Senhas não estão iguais!")
      return
    }
    setLoadingTrue()

    await api.post('/reset-password', { email, token, password: newPassword })
    .then(()=> {
      setIsModalVisible(true)
      closeLoading()
    })
  }
  const memoizedModal = useMemo(()=>(
    <Modal
      title="Tudo resolvido..."
      description="Sua senha foi alterada com sucesso, faça login para entrar"
      keyModal="ResetPassword"
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      yesAndNoButtons={false}
      destinyPage="Login/SignIn"
    />
  ),[isModalVisible])

  const memoizedHeader = useMemo(()=> (
    <SignPageHeader title='Troca de senha'/>
  ),[])

  const memoizedTitle = useMemo(()=> (
    <span className={styles.title}>Insira sua nova senha</span>
  ),[])

  const memoizedNewPassword = useMemo(()=> (
    <div className={!newPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Nova senha</span>
      <input type='password' onChange={(event)=> setNewPassword(event.target.value)}/>
      <FaLock size={20} className={styles.icon}/>
    </div>
  ),[])

  const memoizedConfirmNewPassword = useMemo(()=> (
    <div className={!newPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Confirme nova senha</span>
      <input type='password' onChange={(event)=> setConfirmNewPassword(event.target.value)}/>
      <FaUnlock size={20} className={styles.icon}/>
    </div>
  ),[])

  const memoizedMessage = useMemo(()=> (
    <span className={styles.warningText}>{message}</span>
  ),[message])
  
  const memoizedButton = useMemo(()=> (
    <button type='button' onClick={resetPassword} disabled={newPassword && confirmNewPassword ? false : true}>
      Confirmar
      <FaSave size={24}/>
    </button>
  ),[ newPassword, confirmNewPassword ])

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
          {memoizedNewPassword}
          {memoizedConfirmNewPassword}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}
