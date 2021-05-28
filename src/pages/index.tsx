import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from 'next/link';

import { FaUser, FaEnvelope, FaLock, FaUnlock, FaSignInAlt } from 'react-icons/fa'
import { motion, useMotionValue } from 'framer-motion';
import Cookies from 'js-cookie'

import { SignPageHeader } from "../components/SignPageHeader";
import { LoadingStatus } from '../components/LoadingStatus';
import { useLoading } from '../contexts/LoadingIcon';
import { api } from '../services/api'

import styles from '../styles/app.module.scss'
import { getToken, login, NAME_KEY, TOKEN_KEY } from "../services/auth";
import { useRouter } from "next/router";
import { AuthenticateDB } from "../services/IndexedDB";

export default function SignUp() {
  const [ name, setName ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const [ confirmPassword, setConfirmPassword ] = useState<string>('')
  const [ isFilled, setIsFilled ] = useState(true)
  const { setLoadingTrue, isLoading, setLoadingFalse, closeLoading } = useLoading()
  const history = useRouter()

  const y = useMotionValue(0)
  
  setLoadingFalse()

  useEffect(()=> {
    if(getToken()){
      history.replace("/Home")
      return
    }
    history.prefetch('/Questionnaire')
    history.prefetch('/SignIn')
    history.prefetch('/Home')
  },[])
  useEffect(()=>{
    name && email && password && confirmPassword ? setIsFilled(false) : setIsFilled(true)
  },[email, password, name, confirmPassword])

  const memoizedName = useMemo(()=> (
    <div className={!name ? styles.inputContainer : styles.inputContainerActive}>
      <span>Nome</span>
      <input type='text' onChange={(event)=> setName(event.target.value)}/>
      <FaUser size={20} className={styles.icon}/>
    </div>
  ),[name])

  const memoizedEmail = useMemo(()=> (
    <div className={!email ? styles.inputContainer : styles.inputContainerActive}>
      <span>Email</span>
      <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
      <FaEnvelope size={20} className={styles.icon}/>
    </div>
  ),[email])

  const memoizedPassoword = useMemo(()=> (
    <div className={!password ? styles.inputContainer : styles.inputContainerActive}>
      <span>Senha</span>
      <input type='password' onChange={(event)=> setPassword(event.target.value)}/>
      <FaLock size={20} className={styles.icon}/>
    </div>
  ),[password])

  const memoizedConfirmPassowrd = useMemo(()=> (
    <div className={!confirmPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Confirmar senha</span>
      <input type='password' onChange={(event)=> setConfirmPassword(event.target.value)}/>
      <FaUnlock size={20} className={styles.icon}/>
    </div>
  ),[confirmPassword])

  const memoizedHeader = useMemo(()=> (
    <SignPageHeader title='Cadastrar' button='Entrar'/>
  ),[])
  const memoizedMessage = useMemo(()=> (
    <span className={styles.warningText}>{message}</span>
  ),[message])
  
  const memoizedButton = useMemo(()=> (
      <button type='button' onClick={SignUp} disabled={email && password && confirmPassword ? false : true}>
        Cadastrar
        <FaSignInAlt size={24}/>
      </button>
  ),[isFilled, confirmPassword, password])

  async function SignUp(){
    name.trim()
    email.trim()
    
    if(password !== confirmPassword){
      return setMessage("Sua confirmação de senha inválida!")
    }
    setLoadingTrue()

    await api.post('/register', { name, email, password })
    .then((response)=> {
      login(response.data.token)

      const fullName = String(response.data.user.name)
      const firstName = fullName.split(" ")

      function storageData(){
        localStorage.setItem(NAME_KEY, firstName[0]);
        
        AuthenticateDB(response.data.user)
        history.push('/Questionnaire')
      }
      storageData()
    }).catch(() => {
      closeLoading()
      return setMessage("Email já cadastrado, tente outro!")
    })
  }

  return (
    <div className={styles.wrapper}>
      {memoizedHeader}
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <form className={styles.formContainer}>
          {isLoading && ( <LoadingStatus/>)}
          
          {memoizedName}
          {memoizedEmail}
          {memoizedPassoword}
          {memoizedConfirmPassowrd}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}
