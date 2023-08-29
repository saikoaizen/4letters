import styles from './CircleButton.module.css'
import colors from '@/app/util/colors'

interface Props {
  color?: string
  text: string
  size?: number
  onClick?: () => void
}

export default function CircleButton({
  color = colors.grey,
  text,
  size = 17,
  onClick,
}: Props) {
  return (
    <button
      className={styles.circleButton}
      style={{ backgroundColor: color, width: size }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
