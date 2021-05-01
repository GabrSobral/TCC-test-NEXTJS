import styles from './style.module.scss'
import { FiHeadphones, FiMoreVertical, FiRadio } from 'react-icons/fi'
import Link from 'next/link'

interface ActivityItemProps{
  title : string,
  description : string,
  icons : "music" | "gym",
}
const icon = {
  music: <FiHeadphones size={30} color="#fff"/>,
  gym: <FiRadio size={30} color="#fff"/>
}

export function ActivityItem({ title, description, icons }: ActivityItemProps){
  return(
    <Link href={`/ActivityDetails?title=${title}&description=${description}&icons=${icons}`}>
      <div className={styles.container}>
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