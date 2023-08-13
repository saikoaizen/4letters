import Title from '../components/Title'
import colors from '../util/colors'
import {
  PageWrapper,
  CustomBox,
  CustomButton,
  CustomInput,
  Wrapper,
} from '../components/Components.style'

export default function HomePage() {
  return (
    <PageWrapper>
      <Title />
      <CustomBox>
        <CustomInput placeholder="Enter your name..." maxLength={20} />
        <Wrapper>
          <CustomButton style={{ background: colors.green }}>
            Start Game
          </CustomButton>
          <CustomButton style={{ background: colors.blue }}>
            Create Private Room
          </CustomButton>
        </Wrapper>
      </CustomBox>
    </PageWrapper>
  )
}
