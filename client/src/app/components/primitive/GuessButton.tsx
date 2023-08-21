import styles from './GuessButton.module.css'

export default function GuessButton() {
  return (
    <button className={styles.pushable}>
      <span className={styles.front}>GUESS!</span>
    </button>
  )
}
