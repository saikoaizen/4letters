import './CustomButton.css'
import colors from '../util/colors'
interface Props {
  color?: string
  text: string
}
export default function CustomButton({ color = colors.grey, text }: Props) {
  return (
    <button className="customButton" style={{ backgroundColor: color }}>
      {text}
    </button>
  )
}
