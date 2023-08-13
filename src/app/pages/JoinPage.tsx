import Title from '../components/Title'
import '../components/Common.css'
import colors from '../util/colors'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

export default function JoinPage() {
  return (
    <div className="pageWrapper">
      <Title />
      <div className="customBox">
        <p className="waitingText">John is waiting...</p>
        <div className="wrapper">
          <CustomInput />
          <CustomButton color={colors.green} text="Join Room" />
        </div>
      </div>
    </div>
  )
}
