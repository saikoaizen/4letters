import Title from '../components/Title';
import colors from '../util/colors';
import styles from '../components/Components.module.css';

export default function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      <Title />
      <div className={styles.customBox}>
        <input
          className={styles.customInput}
          placeholder="Enter your name..."
          maxLength={20}
        />
        <div className={styles.wrapper}>
          <button
            className={`${styles.customButton}`}
            style={{backgroundColor: colors.blue}}
          >
            Start Game
          </button>
          <button
            className={`${styles.customButton}`}
            style={{backgroundColor: colors.green}}
          >
            Create Private Room
          </button>
        </div>
      </div>
    </div>
  );
}
