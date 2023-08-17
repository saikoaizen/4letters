import CircleButton from '../components/primitive/CircleButton'
import CustomInput from '../components/primitive/CustomInput'
import colors from '../util/colors'
import '../components/primitive/Common.css'
import PageWrapper from '../components/primitive/PageWrapper'
import WrapperHorizontal from '../components/primitive/WrapperHorizontal'
import Title from '../components/Title'
import GuessButton from '../components/primitive/GuessButton'
import GuessMessage from '../components/primitive/GuessMessage'
import GuessBox from '../components/primitive/GuessBox'
import Message from '../components/primitive/Message'
import Timer from '../components/primitive/Timer'

export default function GamePage() {
  return (
    <PageWrapper>
      <Title />
      <div className={'horizontalGamePage'}>
        <GuessBox>
          <Timer />
          <div className={'guessMessagesBox'}>
            <GuessMessage guessWord={'BOLT'} result={0} alignment={0} />
            <GuessMessage guessWord={'TIME'} result={3} alignment={1} />
            <GuessMessage guessWord={'LINK'} result={1} alignment={0} />
          </div>
          <div className={'bottomHorizontalGuessBox'}>
            <GuessButton />
            <Timer />
          </div>
        </GuessBox>
        <GuessBox>
          <div className={'messagesBox'}>
            <Message
              text={
                'You can adjust these values as needed to achieve the desired responsiveness. The use of viewport units allows your layout to adjust proportionally based on the size of the viewport, making it more adaptable to different screen sizes.'
              }
              alignment={0}
            />
            <Message text={'Testing message'} alignment={1} />
            <Message text={'Testing message'} alignment={0} />
          </div>
          <WrapperHorizontal>
            <CustomInput maxLength={100} />
            <CircleButton color={colors.blue} text=">" size={17} />
          </WrapperHorizontal>
        </GuessBox>
      </div>
    </PageWrapper>
  )
}
