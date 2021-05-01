import { BottomMenu } from "../components/BottomMenu";
import styles from '../styles/app.module.scss'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { useState } from "react";
import { SignPageHeader } from "../components/SignPageHeader";
import Link from "next/link";

export default function SignIn(){
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  return(
    <div className={styles.wrapper}>
    <SignPageHeader title='Entrar' button='Cadastrar'/>
    <section>
      <div className={styles.formContainer}>

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

        <Link href="/Activities">
          <button type='submit'>
            Entrar
            <FaSignInAlt size={24}/>
          </button>
        </Link>

      </div>
    </section>
  </div>
  )
}