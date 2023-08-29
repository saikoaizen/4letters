import styles from './Timer.module.css'
import Image from 'next/image'
import PlayerIcon from '../../../public/PlayerIcon.svg'
import './Common.css'

type Props = {
  name?: string
  selected: boolean
  timerValue: number
}

export default function Timer({ name = '', selected, timerValue }: Props) {
  return (
    <div className={selected ? styles.selectedTimerBox : styles.timerBox}>
      <div className="playerAndIcon">
        <Image src={PlayerIcon} alt="PlayerIcon" width={20} height={20} />
        <div className={styles.playerName}>{name}</div>
      </div>
      <div className={styles.timer}>{timerValue}</div>
    </div>
  )
}
