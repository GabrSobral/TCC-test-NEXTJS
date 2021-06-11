import { useEffect, useMemo, useState } from "react";
import Router, { useRouter } from 'next/router'
import { FaLock, FaUnlock, FaSave, FaKey } from 'react-icons/fa'
import { motion } from 'framer-motion';

import { LoadingStatus } from '../../components/LoadingStatus';
import { useLoading } from '../../contexts/LoadingIcon';
import { Modal } from '../../components/Modal'
import { api } from '../../services/api'

import styles from '../../styles/ForgotPassword.module.scss'
import { Header } from "../../components/header";

export default function ChangePassword() {
  const [ currentPassword, setCurrentPassword ] = useState<string>('')
  const [ newPassword, setNewPassword ] = useState<string>('')
  const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('')

  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)

  const history = useRouter()
  const { email, token } = history.query

  const { setLoadingTrue, isLoading, setLoadingFalse, closeLoading} = useLoading()

  setLoadingFalse()

  async function changePassword(){
    if(newPassword !== confirmNewPassword){
      setMessage("Senhas não estão iguais!")
      return
    }
    setLoadingTrue()
    await api.patch('/change-password', { password: currentPassword, newPassword })
    .then(()=> {
      closeLoading()
      setIsModalVisible(true)
    })
    .catch((err)=>{
      console.log(err.message)
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
      destinyPage="Me/Me"
    />
  ),[isModalVisible])

  const memoizedHeader = useMemo(()=> (
    <Header GoBackIsActive={true}/>
  ),[])

  const memoizedTitle = useMemo(()=> (
    <span className={styles.changePasswordTitle}>Alterar senha</span>
  ),[])

  const memoizedCurrentPassword = useMemo(()=> (
    <div className={!currentPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Senha atual</span>
      <input type='password' onChange={(event)=> setCurrentPassword(event.target.value)}/>
      <FaKey size={20} className={styles.icon}/>
    </div>
  ),[currentPassword])

  const memoizedNewPassword = useMemo(()=> (
    <div className={!newPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Nova senha</span>
      <input type='password' onChange={(event)=> setNewPassword(event.target.value)}/>
      <FaLock size={20} className={styles.icon}/>
    </div>
  ),[newPassword])

  const memoizedConfirmNewPassword = useMemo(()=> (
    <div className={!confirmNewPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Confirme nova senha</span>
      <input type='password' onChange={(event)=> setConfirmNewPassword(event.target.value)}/>
      <FaUnlock size={20} className={styles.icon}/>
    </div>
  ),[confirmNewPassword])

  const memoizedMessage = useMemo(()=> (
    <span className={styles.warningText}>{message}</span>
  ),[message])
  
  const memoizedButton = useMemo(()=> (
    <button type='button' onClick={changePassword} disabled={newPassword && confirmNewPassword ? false : true}>
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
        {memoizedTitle}

        <form className={styles.formContainer}>
          {isLoading && ( <LoadingStatus/>)}
          
          {memoizedModal}

          {memoizedCurrentPassword}
          {memoizedNewPassword}
          {memoizedConfirmNewPassword}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}
