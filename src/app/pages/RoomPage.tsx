import Image from 'next/image'
import colors from '../util/colors'
import PlayerDisplay from '../components/PlayerDisplay'
import SecretIcon from '../../../public/SecretIcon.svg'
import Title from '../components/Title'
import '../components/primitive/Common.css'
import CustomButton from '../components/primitive/CustomButton'
import CustomInput from '../components/primitive/CustomInput'
import LinkDisplay from '../components/LinkDisplay'
import PageWrapper from '../components/primitive/PageWrapper'
import Wrapper from '../components/primitive/Wrapper'
import MenuBox from '../components/primitive/MenuBox'
import WrapperHorizontal from '../components/primitive/WrapperHorizontal'
import Settings from '../components/Settings'

export default function RoomPage() {
  return (
    <PageWrapper>
      <Title />
      <LinkDisplay link={'https://4letters.io/room?=4eQ9ssJq'} />
      <MenuBox>
        <p className="simpleText">Players Active:</p>
        <Wrapper>
          <PlayerDisplay name="Michael" />
          <PlayerDisplay name="John" />
        </Wrapper>
      </MenuBox>
      <Settings />
      <WrapperHorizontal>
        <Image src={SecretIcon} alt="SecretIcon" width={30} height={30} />
        <CustomInput
          placeHolder="SECRET WORD?"
          maxLength={4}
          customStyle={{
            textTransform: 'uppercase',
            maxWidth: 'fit-content',
            background: colors.black,
          }}
        />
      </WrapperHorizontal>
      <CustomButton color={colors.green} text="Start Game" />
    </PageWrapper>
  )
}
