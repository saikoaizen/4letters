import {
  CustomBox,
  CustomButton,
  PageWrapper,
  SimpleText,
  Wrapper,
  SettingsWrapper,
  CustomInput,
} from '../components/Components.style'
import Title from '../components/Title'
import PlayerDisplay from '../components/PlayerDisplay'
import SecretIcon from '../../../public/SecretIcon.svg'
import Image from 'next/image'
import colors from '../util/colors'

export default function RoomPage() {
  return (
    <PageWrapper style={{ gap: 20 }}>
      <Title />
      <CustomBox style={{ padding: 5 }}>
        <SimpleText>Players Active:</SimpleText>
        <Wrapper>
          <PlayerDisplay name="Michael" />
          <PlayerDisplay name="John" />
        </Wrapper>
      </CustomBox>
      <CustomBox style={{ padding: 5, minWidth: '100%' }}>
        <SettingsWrapper>
          <SimpleText>Reveal Winners Word?</SimpleText>
          <SettingsWrapper style={{ flexDirection: 'row' }}>
            <CustomButton>Yes</CustomButton>
            <CustomButton>No</CustomButton>
          </SettingsWrapper>
        </SettingsWrapper>
        <SettingsWrapper style={{ padding: 0, gap: 0 }}>
          <SimpleText>Time Per Turn?</SimpleText>
          <SettingsWrapper style={{ flexDirection: 'row' }}>
            <CustomButton>30 sec</CustomButton>
            <CustomButton>1 min</CustomButton>
            <CustomButton>3 mins</CustomButton>
            <CustomButton>5 mins</CustomButton>
          </SettingsWrapper>
        </SettingsWrapper>
      </CustomBox>
      <Wrapper style={{ flexDirection: 'row', width: '100%' }}>
        <Image src={SecretIcon} alt="SecretIcon" width={30} height={30} />
        <CustomInput
          placeholder="Secret Word?"
          maxLength={4}
          style={{ textTransform: 'uppercase' }}
        />
      </Wrapper>
      <CustomButton
        style={{
          backgroundColor: colors.green,
          fontSize: 15,
          maxWidth: '100%',
        }}
      >
        Start Game
      </CustomButton>
    </PageWrapper>
  )
}
