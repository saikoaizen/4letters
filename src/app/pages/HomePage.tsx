import Title from '../components/Title'
import colors from '../util/colors'
import '../components/primitive/Common.css'
import CustomButton from '../components/primitive/CustomButton'
import CustomInput from '../components/primitive/CustomInput'
import PageWrapper from '../components/primitive/PageWrapper'
import Wrapper from '../components/primitive/Wrapper'
import MenuBox from '../components/primitive/MenuBox'

export default function HomePage() {
  return (
    <PageWrapper>
      <Title />
      <MenuBox>
        <CustomInput placeHolder="Enter your name..." maxLength={20} />
        <Wrapper>
          <CustomButton color={colors.green} text="Start Game" />
          <CustomButton color={colors.blue} text="Create Private Room" />
        </Wrapper>
      </MenuBox>
    </PageWrapper>
  )
}
