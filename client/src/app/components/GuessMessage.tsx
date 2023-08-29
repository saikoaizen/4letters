import styles from './GuessMessage.module.css'

interface Props {
  guessWord: string
  result: number
  alignment: boolean
}

export default function GuessMessage({ guessWord, result, alignment }: Props) {
  return (
    <>
      {alignment ? (
        <div className={styles.rightChild}>
          <span className={styles.resultText}>{result}</span>
          <span className={styles.rightText}>{guessWord} </span>
        </div>
      ) : (
        <div className={styles.leftChild}>
          <span className={styles.leftText}>{guessWord} </span>
          <span className={styles.resultText}>{result}</span>
        </div>
      )}
    </>
  )
}
