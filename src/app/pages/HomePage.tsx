import Title from '../components/Title'
import colors from '../util/colors'
import '../components/Common.css'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

export default function HomePage() {
  return (
    <div className="pageWrapper">
      <Title />
      <div className="customBox">
        <CustomInput />
        <div className="wrapper">
          <CustomButton color={colors.blue} text="Start Game" />
          <CustomButton color={colors.green} text="Create Private Room" />
        </div>
      </div>
    </div>
  )
}
