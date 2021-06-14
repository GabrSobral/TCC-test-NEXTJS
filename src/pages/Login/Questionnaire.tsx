import { FormEvent, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '../../components/header';
import { LoadingStatus } from '../../components/LoadingStatus';
import { api } from '../../services/api';

import styles from '../../styles/Questionnaire.module.scss'
import { useLoading } from '../../contexts/LoadingIcon';
import { useRouter } from 'next/router';
import { getMyData, updateMyQuestionnaire } from '../../services/IndexedDB';

import { QuestionProps } from '../../types/Question';
import { AnimationTypeState } from 'framer-motion/types/render/utils/animation-state';

export default function Questionnaire({ data, questionsID }){
  const history = useRouter()
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingTrue, setLoadingFalse } = useLoading()
  const [ questions, setQuestions ] = useState<QuestionProps[]>([])

  const [ isFilled, setIsFilled ] = useState(false)
  const [ allAnswers, setAllAnswers ] = useState([])
  const [ count, setCount ] = useState(0)

  setLoadingFalse()

  async function getMyDataAndVerifyIfIAlreadyAnsweredTheQuestionnaire(){
    const myData: any = await getMyData()
  
    const nullArray = []

    if(myData.answers.length !== 0){
      history.replace('/Home')
      return
    }
    setIsVisible(true)
    setQuestions(data)

    data.map(()=> nullArray.push(null))
    setAllAnswers(nullArray)

    history.prefetch('/Home/Home')
    history.prefetch("/Activity/Activities")
  }
  useEffect(()=> {
    getMyDataAndVerifyIfIAlreadyAnsweredTheQuestionnaire()
  },[])

  useEffect(() => {
    console.log("entrou")
    if(allAnswers.indexOf(null) === -1) {
      setIsFilled(true)
      console.log("Cheiooooo")
    }
  },[count]) 

  useEffect(()=>{ console.log(allAnswers) }, [allAnswers])

  const memoizedHeader = useMemo(()=> (
    <Header GoBackIsActive={false}/>
  ),[])
  const memoizedTitle = useMemo(()=> (
    <h2>Permita-nos conhecê-lo(a) <br/> melhor</h2>
  ),[])

  async function handleConfirm(){
    setLoadingTrue()

    console.log(allAnswers)

    await api.post('/questionnaire', { answers : allAnswers }).then(()=> {
      updateMyQuestionnaire(allAnswers)
      return history.push("/Home/Home")
    }).catch((err)=>{
      console.log(err.message)
      return history.push("/Home/Home")
    })
  }
  function handleAnswersAndIndex(value: any , index: number){
    let answers = allAnswers

    answers.splice(index, 1, value.target.value)
    console.log(allAnswers)
    setAllAnswers(answers)
  }

  return(
    <div className={styles.container}>
      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {isLoading && (
              <LoadingStatus/>
            )}
            {memoizedTitle}
            {questions.map((question, index) => (
              <div className={styles.questionItem} key={question._id}>
                <span>{question.body}</span>

                <div className={styles.answersContainer} onChange={(event: FormEvent<HTMLInputElement>) => { handleAnswersAndIndex(event, index) }}>
                  <div>
                    <input type="radio" id="answer-0" name={question._id} value="0"/>
                    <label htmlFor="answer-0">0</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-1" name={question._id} value="1"/>
                    <label htmlFor="answer-1">1</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-2" name={question._id} value="2"/>
                    <label htmlFor="answer-2">2</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-3" name={question._id} value="3"/>
                    <label htmlFor="answer-3">3</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-4" name={question._id} value="4"/>
                    <label htmlFor="answer-4">4</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-5" name={question._id} value="5"/>
                    <label htmlFor="answer-5">5</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-6" name={question._id} value="6"/>
                    <label htmlFor="answer-6">6</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-7" name={question._id} value="7"/>
                    <label htmlFor="answer-7">7</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-8" name={question._id} value="8"/>
                    <label htmlFor="answer-8">8</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-9" name={question._id} value="9"/>
                    <label htmlFor="answer-9">9</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-10" name={question._id} value="10"/>
                    <label htmlFor="answer-10">10</label>
                  </div>
                </div>
              </div>
            ))}

              <button 
                type="button" 
                onClick={handleConfirm}
                disabled={!isFilled}
              >
                Continuar
              </button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const questionsID = []
  const { TCC_APIToken } = ctx.req.cookies

  api.interceptors.request.use(async config => {
    if (TCC_APIToken) {
      config.headers.Authorization = `Bearer ${TCC_APIToken}`;
    }
    return config;
  });
  const { data } = await api.get('/questions')

  data.map((question : QuestionProps)=> {
    questionsID.push(question._id)
  })
  return {
    props: {
      data,
      questionsID
    },
  }
}