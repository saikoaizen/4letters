import styles from './CircleButton.module.css'
import colors from '@/app/util/colors'

interface Props {
  color?: string
  text: string
  onClick?: () => void
}

export default function CircleButton({
  color = colors.grey,
  text,
  onClick,
}: Props) {
  return (
    <button
      className={styles.circleButton}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
