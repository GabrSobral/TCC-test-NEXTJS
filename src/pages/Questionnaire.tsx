import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BottomMenu } from '../components/BottomMenu';
import { Header } from '../components/header';
import styles from '../styles/Questionnaire.module.scss'

export default function Questionnaire(){
  const  [ isVisible, setIsVisible ] = useState(false)

  useEffect(()=> {
    setIsVisible(true)
  },[])

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={false}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "fit-content"}}
            exit={{ opacity: 0}}
          >

            <h2>Permita-nos conhecê-lo(a) <br/> melhor</h2>

            <div className={styles.questionItem}>
              <span>De 0 à 10, quanto você gosta de ler?</span>

              <div className={styles.answersContainer}>
                <div>
                  <input type="radio" id="answer-0" name="question-1" value="0"/>
                  <label htmlFor="answer-0">0</label>
                </div>
                <div>
                  <input type="radio" id="answer-1" name="question-1" value="1"/>
                  <label htmlFor="answer-1">1</label>
                </div>
                <div>
                  <input type="radio" id="answer-2" name="question-1" value="2"/>
                  <label htmlFor="answer-2">2</label>
                </div>
                <div>
                  <input type="radio" id="answer-3" name="question-1" value="3"/>
                  <label htmlFor="answer-3">3</label>
                </div>
                <div>
                  <input type="radio" id="answer-4" name="question-1" value="4"/>
                  <label htmlFor="answer-4">4</label>
                </div>
                <div>
                  <input type="radio" id="answer-5" name="question-1" value="5"/>
                  <label htmlFor="answer-5">5</label>
                </div>
                <div>
                  <input type="radio" id="answer-6" name="question-1" value="6"/>
                  <label htmlFor="answer-6">6</label>
                </div>
                <div>
                  <input type="radio" id="answer-7" name="question-1" value="7"/>
                  <label htmlFor="answer-7">7</label>
                </div>
                <div>
                  <input type="radio" id="answer-8" name="question-1" value="8"/>
                  <label htmlFor="answer-8">8</label>
                </div>
                <div>
                  <input type="radio" id="answer-9" name="question-1" value="9"/>
                  <label htmlFor="answer-9">9</label>
                </div>
                <div>
                  <input type="radio" id="answer-10" name="question-1" value="10"/>
                  <label htmlFor="answer-10">10</label>
                </div>
              </div>
            </div>

            <div className={styles.questionItem}>
              <span>De 0 à 10, quanto você gosta de cozinhar?</span>

              <div className={styles.answersContainer}>
                <div>
                  <input type="radio" id="answer-0" name="question-1" value="0"/>
                  <label htmlFor="answer-0">0</label>
                </div>
                <div>
                  <input type="radio" id="answer-1" name="question-1" value="1"/>
                  <label htmlFor="answer-1">1</label>
                </div>
                <div>
                  <input type="radio" id="answer-2" name="question-1" value="2"/>
                  <label htmlFor="answer-2">2</label>
                </div>
                <div>
                  <input type="radio" id="answer-3" name="question-1" value="3"/>
                  <label htmlFor="answer-3">3</label>
                </div>
                <div>
                  <input type="radio" id="answer-4" name="question-1" value="4"/>
                  <label htmlFor="answer-4">4</label>
                </div>
                <div>
                  <input type="radio" id="answer-5" name="question-1" value="5"/>
                  <label htmlFor="answer-5">5</label>
                </div>
                <div>
                  <input type="radio" id="answer-6" name="question-1" value="6"/>
                  <label htmlFor="answer-6">6</label>
                </div>
                <div>
                  <input type="radio" id="answer-7" name="question-1" value="7"/>
                  <label htmlFor="answer-7">7</label>
                </div>
                <div>
                  <input type="radio" id="answer-8" name="question-1" value="8"/>
                  <label htmlFor="answer-8">8</label>
                </div>
                <div>
                  <input type="radio" id="answer-9" name="question-1" value="9"/>
                  <label htmlFor="answer-9">9</label>
                </div>
                <div>
                  <input type="radio" id="answer-10" name="question-1" value="10"/>
                  <label htmlFor="answer-10">10</label>
                </div>
              </div>
            </div>

            <div className={styles.questionItem}>
              <span>De 0 à 10, quanto você gosta de fazer exercicios?</span>

              <div className={styles.answersContainer}>
                <div>
                  <input type="radio" id="answer-0" name="question-1" value="0"/>
                  <label htmlFor="answer-0">0</label>
                </div>
                <div>
                  <input type="radio" id="answer-1" name="question-1" value="1"/>
                  <label htmlFor="answer-1">1</label>
                </div>
                <div>
                  <input type="radio" id="answer-2" name="question-1" value="2"/>
                  <label htmlFor="answer-2">2</label>
                </div>
                <div>
                  <input type="radio" id="answer-3" name="question-1" value="3"/>
                  <label htmlFor="answer-3">3</label>
                </div>
                <div>
                  <input type="radio" id="answer-4" name="question-1" value="4"/>
                  <label htmlFor="answer-4">4</label>
                </div>
                <div>
                  <input type="radio" id="answer-5" name="question-1" value="5"/>
                  <label htmlFor="answer-5">5</label>
                </div>
                <div>
                  <input type="radio" id="answer-6" name="question-1" value="6"/>
                  <label htmlFor="answer-6">6</label>
                </div>
                <div>
                  <input type="radio" id="answer-7" name="question-1" value="7"/>
                  <label htmlFor="answer-7">7</label>
                </div>
                <div>
                  <input type="radio" id="answer-8" name="question-1" value="8"/>
                  <label htmlFor="answer-8">8</label>
                </div>
                <div>
                  <input type="radio" id="answer-9" name="question-1" value="9"/>
                  <label htmlFor="answer-9">9</label>
                </div>
                <div>
                  <input type="radio" id="answer-10" name="question-1" value="10"/>
                  <label htmlFor="answer-10">10</label>
                </div>
              </div>
            </div>

            <Link href="/Home">
              <button type="button">
                Continuar
              </button>
            </Link> 
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}