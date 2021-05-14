import styles from '../styles/app.module.scss'
import { FaUser, FaEnvelope, FaLock, FaUnlock, FaSignInAlt } from 'react-icons/fa'
import { useState } from "react";
import { SignPageHeader } from "../components/SignPageHeader";
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function SignUp() {
  const [ name, setName ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ confirmPassword, setConfirmPassword ] = useState<string>('')


  return (
    <div className={styles.wrapper}>
      <SignPageHeader title='Cadastrar' button='Entrar'/>
      <section>
        <div className={styles.formContainer}>

          <div className={!name ? styles.inputContainer : styles.inputContainerActive}>
            <span>Nome</span>
            <input type='text' onChange={(event)=> setName(event.target.value)}/>
            <FaUser size={20} className={styles.icon}/>
          </div>

          <div className={!email ? styles.inputContainer : styles.inputContainerActive}>
            <span>Email</span>
            <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
            <FaEnvelope size={20} className={styles.icon}/>
          </div>

          <div className={!password ? styles.inputContainer : styles.inputContainerActive}>
            <span>Senha</span>
            <input type='password' onChange={(event)=> setPassword(event.target.value)}/>
            <FaLock size={20} className={styles.icon}/>
          </div>

          <div className={!confirmPassword ? styles.inputContainer : styles.inputContainerActive}>
            <span>Confirmar senha</span>
            <input type='password' onChange={(event)=> setConfirmPassword(event.target.value)}/>
            <FaUnlock size={20} className={styles.icon}/>
          </div>

        <Link href="/Questionnaire">
          <button type='submit'>
            Cadastrar
            <FaSignInAlt size={24}/>
          </button>
        </Link>
        </div>
      </section>
    </div>
  )
}
