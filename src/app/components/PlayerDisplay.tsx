import { PlayerDisplayBox, SimpleText, PlayerAndIcon } from './Components.style'
import PlayerIcon from '../../../public/PlayerIcon.svg'
import CheckIcon from '../../../public/CheckIcon.svg'
import Image from 'next/image'

type PlayerDisplayProps = {
  name: string
}

export default function PlayerDisplay({ name }: PlayerDisplayProps) {
  return (
    <PlayerDisplayBox>
      <PlayerAndIcon>
        <Image src={PlayerIcon} alt="PlayerIcon" width={20} height={20} />
        <SimpleText>{name}</SimpleText>
      </PlayerAndIcon>
      <Image src={CheckIcon} alt="CheckIcon" width={20} height={20} />
    </PlayerDisplayBox>
  )
}
