import './CustomInput.css'
interface Props {
  placeHolder?: string
  maxLength?: number
}
export default function CustomInput({
  placeHolder = 'Enter your name...',
  maxLength = 20,
}: Props) {
  return (
    <input
      className="customInput"
      placeholder={placeHolder}
      maxLength={maxLength}
    />
  )
}
