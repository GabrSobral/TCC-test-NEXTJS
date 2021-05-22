import styles from '../styles/app.module.scss'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { FormEvent, useEffect, useMemo, useState } from "react";
import { SignPageHeader } from "../components/SignPageHeader";
import { motion, useMotionValue } from "framer-motion";
import { useLoading } from '../contexts/LoadingIcon';
import { LoadingStatus } from '../components/LoadingStatus';
import { login, NAME_KEY } from '../services/auth';
import { useRouter } from 'next/router';
import { api } from '../services/api';
import { AuthenticateDB } from '../services/IndexedDB';

export default function SignIn(){
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const { setLoadingTrue, isLoading, setLoadingFalse, closeLoading } = useLoading()
  const [ isFilled, setIsFilled ] = useState(true)
  const [ message, setMessage ] = useState<string>('')

  const history = useRouter()

  setLoadingFalse()
  useEffect(()=> {
    history.prefetch('/Questionnaire')
    history.prefetch('/SignIn')
  },[])

  useEffect(()=>{
    email && password ? setIsFilled(false) : setIsFilled(true)
  },[email, password])

  const y = useMotionValue(0)

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
  
  const memoizedMessage = useMemo(()=> (
    <span>{message}</span>
  ),[message])

  const memoizedButton = useMemo(()=> (
    <button type='submit' disabled={isFilled} onClick={SignIn}>
      Entrar
      <FaSignInAlt size={24}/>
    </button>
  ),[isFilled])

  const memoizedHeader = useMemo(()=> (
    <SignPageHeader title='Entrar' button='Cadastrar'/>
  ),[])

  async function SignIn(event : FormEvent){
    event.preventDefault();
    setLoadingTrue()

    await api.post('/authenticate', { email, password })
    .then((response)=> {
      login(response.data.token)

      const fullName = String(response.data.user.name)
      const firstName = fullName.split(" ")
      
      localStorage.setItem(NAME_KEY, firstName[0]);
      AuthenticateDB(response.data.user)
      return history.push('/Questionnaire')
      
    }).catch((err) => {
      closeLoading()
      console.log(err)
      return setMessage(err.message)
    })
  }

  return(
    <div className={styles.wrapper}>
      {memoizedHeader}
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <form className={styles.formContainer}>
          {isLoading && (<LoadingStatus/>) }
          {memoizedEmail}
          {memoizedPassoword}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}