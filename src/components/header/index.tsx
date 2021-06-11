import { FiArrowLeft } from 'react-icons/fi'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Urgent from '../../images/urgent.svg'
import { useActivity } from '../../contexts/ActivityContext'

import styles from './style.module.scss'

interface HeaderProps{
  GoBackIsActive : boolean
}

export function Header({ GoBackIsActive} : HeaderProps){
  const { setUserName, name } = useActivity()
  const router = useRouter()
  const x = useMotionValue(0)
  const variants = {
    active: {
      x : [0, 50]
    },
    disable :{
      x: 0
    }
  }
  useEffect(()=>{
    setUserName()
  },[])

  return(
    <header className={styles.container}>
      <motion.div className={styles.name}>

        <AnimatePresence>
          {GoBackIsActive && (
            <motion.button 
              onClick={() => router.back()}
              key="GoBackKey"
              type='button'
              animate={{ 
                display: "block",
                opacity: [0, 1]
              }}
              transition={{ 
                delay: 0.5,
                duration: 0.5, 
                type: 'spring' 
              }}
            >
              <FiArrowLeft size={30} color="#434343"/>
          </motion.button>
          )}    
        
          <motion.h2
            animate={GoBackIsActive ? "active" : "disable"}
            key="GoBackWord"
            transition={{ 
              bounce: 0.5, 
              duration: 0.5, 
              type: 'spring' 
            }}
            variants={variants}
          >
            Olá, 
          <motion.span>{name}</motion.span>
          </motion.h2>
        </AnimatePresence>
      </motion.div>

      <div className={styles.userImage}>
        <button type="button">
          <img src={Urgent} alt="Urgencia de ansiedade" />
        </button>
      </div>
    </header>
  )
}
