import styles from './Message.module.css'
import Image from 'next/image'
import PlayerIcon from '../../../../public/PlayerIcon.svg'

type Props = {
  text: string
  alignment: number
}

export default function Message({ text, alignment }: Props) {
  return (
    <>
      {alignment === 0 ? (
        <div className={styles.messageRight}>
          <text className={styles.message}>{text} </text>
          <Image src={PlayerIcon} alt="icon" width={20} height={20} />
        </div>
      ) : (
        <div className={styles.messageLeft}>
          <Image src={PlayerIcon} alt="icon" width={20} height={20} />
          <text className={styles.message}>{text} </text>
        </div>
      )}
    </>
  )
}
