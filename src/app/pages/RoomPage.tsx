import Image from 'next/image'
import colors from '../util/colors'
import PlayerDisplay from '../components/PlayerDisplay'
import SecretIcon from '../../../public/SecretIcon.svg'
import Title from '../components/Title'
import '../components/primitive/Common.css'
import CustomButton from '../components/primitive/CustomButton'
import CustomInput from '../components/primitive/CustomInput'
import LinkDisplay from '../components/LinkDisplay'
import Settings from '../components/Settings'

export default function RoomPage() {
  return (
    <div className="pageWrapper">
      <Title />
      <LinkDisplay link={'https://4letters.io/room?=4eQ9ssJq'} />
      <div className="menuBox">
        <p className="simpleText">Players Active:</p>
        <div className="wrapper">
          <PlayerDisplay name="Michael" />
          <PlayerDisplay name="John" />
        </div>
      </div>
      <Settings />
      <div className="wrapperHorizontal">
        <Image src={SecretIcon} alt="SecretIcon" width={30} height={30} />
        <CustomInput
          placeHolder="SECRET WORD?"
          maxLength={4}
          customStyle={{
            maxWidth: 'fit-content',
            background: colors.black,
          }}
        />
      </div>
      <CustomButton color={colors.green} text="Start Game" />
    </div>
  )
}
