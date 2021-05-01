import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiHeadphones, FiRadio, FiPlay, FiTrash, FiCheck } from 'react-icons/fi'

import { BottomMenu } from '../components/BottomMenu'
import { Header } from '../components/header'
import Trophy from '../images/trophy.svg'

import styles from '../styles/activityDetail.module.scss'

const icon = {
  music: <FiHeadphones size={30} color="#fff"/>,
  gym: <FiRadio size={30} color="#fff"/>
}

export default function ActivitiyDetails(){
  const  [ isVisible, setIsVisible ] = useState(false)
  const  [ isModalVisible, setIsModalVisible ] = useState(false)
  
  const router = useRouter()
  const { title, description, icons } = router.query

  useEffect(()=> {
    setIsVisible(true)
  },[])

  function Finish(){
    setIsModalVisible(true)
  }

  function ModalSuccess(){
    return(
      <motion.div className={styles.modalBackground}
        layout
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
      >
        <AnimatePresence>
          <motion.div className={styles.modalContainer}
            layout
            key="modalSuccess"
            animate={{
              height : [0, 320], 
              opacity:[0, 1]}}
            exit={{ height: 0}}
            transition={{ 
              delay: 0.25,
              bounce: 0.5, 
              type: "spring", 
              duration: 0.5 }}
          >
          <motion.svg id="Capa_1" enable-background="new 0 0 512 512" height="120" viewBox="0 0 512 512" width="120" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m359.801 429.3-103.801-30-103.801 30c-.899 1.8-1.199 3.6-1.199 5.7v62h210v-62c0-2.1-.3-3.9-1.199-5.7z" fill="#646d73"/></g><path d="m361 497v-62c0-2.1-.3-3.9-1.199-5.7l-103.801-30v97.7z" fill="#474f54"/><path d="m497 30h-76.645c.132-5.067.645-9.84.645-15 0-8.401-6.599-15-15-15h-300c-8.401 0-15 6.599-15 15 0 5.16.513 9.933.643 15h-76.643c-8.291 0-15 6.709-15 15v37.998c0 83.754 67.092 151.791 149.773 156.171 17.225 23.716 37.668 41.316 60.927 51.231-3.6 72.9-45.3 123.6-55.199 134.101-1.501 1.199-2.701 2.999-3.301 4.799h207.601c-.601-1.8-1.8-3.6-3.301-4.799-10.2-10.501-51.6-60.901-55.2-134.101 23.264-9.917 43.83-27.521 61.069-51.246 82.61-4.451 149.631-72.449 149.631-156.156v-37.998c0-8.291-6.709-15-15-15zm-467 52.998v-22.998h62.93c3.893 49.578 14.644 102.086 37.24 146.708-56.64-12.755-100.17-63.265-100.17-123.71zm452 0c0 60.414-43.491 110.9-100.089 123.684 22.417-44.621 33.228-96.621 37.159-146.682h62.93z" fill="#fed843"/><path d="m497 30h-76.645c.132-5.067.645-9.84.645-15 0-8.401-6.599-15-15-15h-150v429.3h103.801c-.601-1.8-1.8-3.6-3.301-4.799-10.2-10.501-51.6-60.901-55.2-134.101 23.264-9.917 43.83-27.521 61.069-51.246 82.61-4.451 149.631-72.449 149.631-156.156v-37.998c0-8.291-6.709-15-15-15zm-15 52.998c0 60.414-43.491 110.9-100.089 123.684 22.419-44.621 33.23-96.621 37.159-146.682h62.93z" fill="#fabe2c"/><g id="Trophy_31_"><g><path d="m279.936 190.796-23.936-12.437-23.936 12.437c-5.01 2.578-11.133 2.153-15.732-1.172-4.6-3.34-6.914-8.994-5.977-14.59l4.395-26.646-19.189-18.94c-4.177-4.072-5.454-10.109-3.75-15.322 1.758-5.391 6.416-9.346 12.041-10.195l26.66-4.014 12.07-24.126c5.098-10.166 21.738-10.166 26.836 0l12.07 24.126 26.66 4.014c5.625.85 10.283 4.805 12.041 10.195 1.758 5.405.322 11.338-3.75 15.322l-19.189 18.94 4.395 26.646c.938 5.596-1.377 11.25-5.977 14.59-4.569 3.311-10.681 3.8-15.732 1.172z" fill="#fabe2c"/></g></g><path d="m279.936 190.796c5.052 2.628 11.164 2.139 15.732-1.172 4.6-3.34 6.914-8.994 5.977-14.59l-4.395-26.646 19.189-18.94c4.072-3.984 5.508-9.917 3.75-15.322-1.758-5.391-6.416-9.346-12.041-10.195l-26.66-4.014-12.07-24.126c-2.549-5.083-7.983-7.625-13.418-7.625v110.193z" fill="#ff9100"/><g><path d="m376 512h-240c-8.291 0-15-6.709-15-15s6.709-15 15-15h240c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#474f54"/></g><path d="m376 482h-120v30h120c8.291 0 15-6.709 15-15s-6.709-15-15-15z" fill="#32393f"/></g></motion.svg>
            <motion.div>
              <motion.h2>Parabéns!</motion.h2>
              <motion.p>Você conseguiu realizar uma tarefa, isso é ótimo!</motion.p>
            </motion.div>

            <motion.button type="button" onClick={() => setIsModalVisible(false)}>
              Fechar
            </motion.button>
          </motion.div>


        </AnimatePresence>
      </motion.div>
    )
  }

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={true}/>
      <AnimatePresence exitBeforeEnter>
        {isModalVisible && (
          <ModalSuccess/>
        )}
      </AnimatePresence>

    <AnimateSharedLayout type="crossfade">
      <AnimatePresence exitBeforeEnter>
        {isVisible && (

          <motion.main
          layout
          key="modal"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "fit-content"}}
          exit={{ opacity: 0, height: 0}}
        >
          <div className={styles.activityItem}>
            <div className={styles.icon}>
              {icon[String(icons)]}
            </div>

            <div className={styles.content}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>

          <div className={styles.ActivityDescription}>
            <p>Ouça   músicas relaxantes, para esvaziar a sua mente.</p>

            <p>Esse tipo de exercício é muito util para se livrar do estresse 
              e dos pensamentos corriqueiros do dia a dia.</p>

            <p>Você pode tentar meditar enquanto escuta as músicas, isso fará 
              você ter um maior proveito do exercício.</p>

          </div>
          

          <div className={styles.playerContainer}>
            <span>Nós recomendamos esta música.</span>

            <div className={styles.player}>
              <button type="button">
                <FiPlay size={30} color="#fff" fill="#fff"/>
              </button>

              <div className={styles.playerControllers}>
                <span>00:00</span>
                <div className={styles.slider}>
                  <div></div>
                </div>
                <span>03:56</span>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="button">
              <FiTrash size={28} color="#fff"/>
              Excluir
            </button>

            <button type="button" onClick={Finish}>
              <FiCheck size={28} color="#fff"/>
              Terminei
            </button>
          </div>
        </motion.main>

      )}
        
      </AnimatePresence>
    </AnimateSharedLayout>
      <BottomMenu pageActive='activities'/>
    </div>
  )
}