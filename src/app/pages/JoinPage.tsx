import Title from '../components/Title';
import styles from '../components/Components.module.css';
import colors from '../util/colors';

export default function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      <Title />
      <div className={styles.customBox}>
        <p className={styles.waitingText}>John is waiting...</p>
        <div className={styles.wrapper}>
          <input
            className={styles.customInput}
            placeholder="Enter your name..."
            maxLength={20}
          />
          <button
            className={styles.customButton}
            style={{ backgroundColor: colors.green }}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}