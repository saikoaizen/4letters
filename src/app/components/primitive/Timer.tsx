import styles from './Timer.module.css'
import Image from 'next/image'
import PlayerIcon from '../../../../public/PlayerIcon.svg'

export default function Timer() {
  return (
    <div className={styles.timerBox}>
      <div className="playerAndIcon">
        <Image src={PlayerIcon} alt="PlayerIcon" width={20} height={20} />
        <div className={styles.playerName}>Michael</div>
      </div>
      <div className={styles.timer}>01:01</div>
    </div>
  )
}
