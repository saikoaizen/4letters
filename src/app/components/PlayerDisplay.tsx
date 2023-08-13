import styles from './Components.module.css';
import PlayerIcon from '../../../public/PlayerIcon.svg';
import CheckIcon from '../../../public/CheckIcon.svg';
import Image from 'next/image';

type PlayerDisplayProps = {
  name: string;
};

export default function PlayerDisplay({ name }: PlayerDisplayProps) {
  return (
    <div className={styles.playerDisplayBox}>
      <div className={styles.playerAndIcon}>
        <Image src={PlayerIcon} alt="PlayerIcon" width={20} height={20} />
        <p className={styles.simpleText}>{name}</p>
      </div>
      <Image src={CheckIcon} alt="CheckIcon" width={20} height={20} />
    </div>
  );
}
