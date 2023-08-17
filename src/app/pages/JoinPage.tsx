import Title from '../components/Title'
import '../components/primitive/Common.css'
import colors from '../util/colors'
import CustomButton from '../components/primitive/CustomButton'
import CustomInput from '../components/primitive/CustomInput'

export default function JoinPage() {
  return (
    <div className="pageWrapper">
      <Title />
      <div className="menuBox">
        <p className="waitingText">John is waiting...</p>
        <div className="wrapper">
          <CustomInput placeHolder="Enter your name..." maxLength={20} />
          <CustomButton color={colors.green} text="Join Room" />
        </div>
      </div>
    </div>
  )
}
