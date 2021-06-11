import { useEffect, useMemo, useState } from "react";
// import Router from 'next/router'
import { FaEnvelope, FaSignInAlt } from 'react-icons/fa'
import { motion } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { LoadingStatus } from '../../components/LoadingStatus';
import { useLoading } from '../../contexts/LoadingIcon';
import { api } from '../../services/api'

import styles from '../../styles/ForgotPassword.module.scss'

export default function SignUp() {
  const [ email, setEmail ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const { setLoadingTrue, isLoading, setLoadingFalse } = useLoading()

  setLoadingFalse()

  // useEffect(()=> {

  //   Router.prefetch('/Login/Questionnaire')
  //   Router.prefetch('/Login/SignIn')
  //   Router.prefetch('/Home/Home')

  // },[])

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
    <button type='button' onClick={SignUp} disabled={email ? false : true}>
      Cadastrar
      <FaSignInAlt size={24}/>
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
          {memoizedTitle}
          {memoizedEmail}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}
