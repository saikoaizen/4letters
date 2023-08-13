import Image from 'next/image'
import colors from '../util/colors'
import PlayerDisplay from '../components/PlayerDisplay'
import SecretIcon from '../../../public/SecretIcon.svg'
import Title from '../components/Title'
import '../components/Common.css'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'

export default function RoomPage() {
  return (
    <div className="pageWrapper">
      <Title />
      <div className="customBox">
        <p className="simpleText">Players Active:</p>
        <div className="wrapper">
          <PlayerDisplay name="Michael" />
          <PlayerDisplay name="John" />
        </div>
      </div>
      <div className="customBox">
        <div className="Wrapper">
          <p className="simpleText">Reveal Winners Word?</p>
          <div className="settingsWrapper flexRow">
            <CustomButton text="Yes" />
            <CustomButton text="No" />
          </div>
        </div>
        <div className="Wrapper">
          <p className="simpleText">Time Per Turn?</p>
          <div className="settingsWrapper flexRow">
            <CustomButton text="30 sec" />
            <CustomButton text="1 min" />
            <CustomButton text="3 mins" />
            <CustomButton text="5 mins" />
          </div>
        </div>
      </div>
      <div className="settingsWrapper">
        <Image src={SecretIcon} alt="SecretIcon" width={30} height={30} />
        <CustomInput placeHolder="SECRET WORD?" maxLength={4} />
      </div>
      <CustomButton color={colors.green} text="Start Game" />
    </div>
  )
}
