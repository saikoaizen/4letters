import styles from "./Timer.module.css";

export default function Timer() {
  return (
    <div className={styles.timerBox}>
      <div className="playerAndIcon">
        <img src="PlayerIcon.svg" alt="PlayerIcon" width={20} height={20} />
        <div className={styles.playerName}>Michael</div>
      </div>
      <div className={styles.timer}>01:01</div>
    </div>
  );
}
