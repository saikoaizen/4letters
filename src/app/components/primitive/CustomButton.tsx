import styles from './CustomButton.module.css'
import colors from '@/app/util/colors'

interface Props {
  color?: string
  text: string
  size?: number
  selected?: boolean
  onClick?: () => void
}

export default function CustomButton({
  color = colors.grey,
  text,
  selected = false,
  onClick,
}: Props) {
  return (
    <button
      className={selected ? styles.selectedButton : styles.customButton}
      style={{ backgroundColor: selected ? colors.blue : color }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
