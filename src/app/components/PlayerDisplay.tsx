import './primitive/Common.css'
import PlayerIcon from '../../../public/PlayerIcon.svg'
import CheckIcon from '../../../public/CheckIcon.svg'
import Image from 'next/image'

interface Props {
  name: string
}

export default function PlayerDisplay({ name }: Props) {
  return (
    <div className="playerDisplayBox">
      <div className="playerAndIcon">
        <Image src={PlayerIcon} alt="PlayerIcon" width={20} height={20} />
        <p className="simpleText">{name}</p>
      </div>
      <Image src={CheckIcon} alt="CheckIcon" width={20} height={20} />
    </div>
  )
}
