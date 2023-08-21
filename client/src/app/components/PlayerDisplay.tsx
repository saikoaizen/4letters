import './primitive/Common.css'
import PlayerIcon from '../../../public/PlayerIcon.svg'
import CheckIcon from '../../../public/CheckIcon.svg'
import Image from 'next/image'
import colors from '../util/colors'

interface Props {
  name: string
  isPartyLeader: boolean
  ready: boolean
}

export default function PlayerDisplay({ name, isPartyLeader, ready }: Props) {
  return (
    <div className="playerDisplayBox">
      <div className="playerAndIcon">
        <Image src={PlayerIcon} alt="PlayerIcon" width={20} height={20} />
        <p className="simpleText">{name}</p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          alignItems: 'center',
          color: colors.turquoise,
        }}
      >
        {isPartyLeader && <h6>LEADER</h6>}
        {ready && (
          <Image src={CheckIcon} alt="CheckIcon" width={20} height={20} />
        )}
      </div>
    </div>
  )
}
