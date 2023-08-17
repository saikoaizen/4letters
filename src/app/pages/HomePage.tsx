import Title from '../components/Title'
import colors from '../util/colors'
import '../components/primitive/Common.css'
import CustomButton from '../components/primitive/CustomButton'
import CustomInput from '../components/primitive/CustomInput'

export default function HomePage() {
  return (
    <div className="pageWrapper">
      <Title />
      <div className="menuBox">
        <CustomInput placeHolder="Enter your name..." maxLength={20} />
        <div className="wrapper">
          <CustomButton color={colors.green} text="Start Game" />
          <CustomButton color={colors.blue} text="Create Private Room" />
        </div>
      </div>
    </div>
  )
}
