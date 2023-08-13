import Image from 'next/image';
import colors from '../util/colors';
import PlayerDisplay from '../components/PlayerDisplay';
import SecretIcon from '../../../public/SecretIcon.svg';
import Title from '../components/Title';
import styles from '../components/Components.module.css';

export default function RoomPage() {
  return (
    <div className={styles.pageWrapper}>
      <Title />
      <div className={`${styles.customBox}`}>
        <p className={styles.simpleText}>Players Active:</p>
        <div className={styles.wrapper}>
          <PlayerDisplay name="Michael" />
          <PlayerDisplay name="John" />
        </div>
      </div>
      <div className={`${styles.customBox}`}>
        <div className={styles.Wrapper}>
          <p className={styles.simpleText}>Reveal Winners Word?</p>
          <div className={`${styles.settingsWrapper} ${styles.flexRow}`}>
            <button className={styles.customButton}>Yes</button>
            <button className={styles.customButton}>No</button>
          </div>
        </div>
        <div className={`${styles.Wrapper}`}>
          <p className={styles.simpleText}>Time Per Turn?</p>
          <div className={`${styles.settingsWrapper} ${styles.flexRow}`}>
            <button className={styles.customButton}>30 sec</button>
            <button className={styles.customButton}>1 min</button>
            <button className={styles.customButton}>3 mins</button>
            <button className={styles.customButton}>5 mins</button>
          </div>
        </div>
      </div>
      <div className={`${styles.settingsWrapper}`}>
        <Image src={SecretIcon} alt="SecretIcon" width={30} height={30} />
        <input
          className={`${styles.customInput} ${styles.uppercase}`}
          placeholder="Secret Word?"
          maxLength={4}
          style={{ textTransform: 'uppercase' }}
        />
      </div>
      <button
        className={`${styles.customButton}`}
        style={{
          backgroundColor: colors.green,
          fontSize: '15px',
          minWidth: 'fit-content',
        }}
      >
        Start Game
      </button>
    </div>
  );
}
