import Title from '../components/Title'
import colors from '../util/colors'
import {
  PageWrapper,
  CustomBox,
  CustomButton,
  CustomInput,
  Wrapper,
  WaitingText,
} from '../components/Components.style'

export default function HomePage() {
  return (
    <PageWrapper>
      <Title />
      <CustomBox>
        <WaitingText>John is waiting...</WaitingText>
        <Wrapper>
          <CustomInput placeholder="Enter your name..." maxLength={20} />
          <CustomButton style={{ background: colors.green }}>
            Join Room
          </CustomButton>
        </Wrapper>
      </CustomBox>
    </PageWrapper>
  )
}
