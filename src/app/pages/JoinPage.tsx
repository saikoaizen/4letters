import Title from '../components/Title'
import '../components/primitive/Common.css'
import colors from '../util/colors'
import CustomButton from '../components/primitive/CustomButton'
import CustomInput from '../components/primitive/CustomInput'
import PageWrapper from '../components/primitive/PageWrapper'
import Wrapper from '../components/primitive/Wrapper'
import MenuBox from '../components/primitive/MenuBox'

export default function JoinPage() {
  return (
    <PageWrapper>
      <Title />
      <MenuBox>
        <p className="waitingText">John is waiting...</p>
        <Wrapper>
          <CustomInput placeHolder="Enter your name..." maxLength={20} />
          <CustomButton color={colors.green} text="Join Room" />
        </Wrapper>
      </MenuBox>
    </PageWrapper>
  )
}
