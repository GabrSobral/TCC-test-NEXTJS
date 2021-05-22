import styles from './style.module.scss'
import Link from 'next/link'
import { FiHeadphones, FiMoreVertical, FiRadio } from 'react-icons/fi'

import Medic from '../../images/medic.svg'
import Clock from '../../images/clock.svg'
import Gym from '../../images/Gym.svg'
import { ButtonHTMLAttributes, HTMLProps } from 'react'
import { useLoading } from '../../contexts/LoadingIcon'

interface ActivityItemProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  title : string,
  description : string,
  icons : "music" | "gym" | "medic" | "clock",
}

const icon = {
  music: <FiHeadphones size={30} color="#fff"/>,
  gym: <img src={Gym} alt="" style={{ width: 30, height: 30 }}/>,
  medic : <img src={Medic} alt="" style={{ width: 30, height: 30 }}/>,
  clock : <img src={Clock} alt="" style={{ width: 30, height: 30 }}/>
}

export function ActivityItem({ title, description, icons }: ActivityItemProps){
  const { setLoadingTrue } = useLoading()
  
  return(
    <Link href={`/ActivityDetails?title=${title}&description=${description}&icons=${icons}`}>
      <div className={styles.container} onClick={setLoadingTrue}>
        <div className={styles.icon}>
          {icon[icons]}
        </div>

        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <button type="button">
          <FiMoreVertical size={30} color="#fff"/>
        </button>
      </div>
    </Link>
  )
}