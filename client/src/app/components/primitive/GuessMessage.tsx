import styles from './GuessMessage.module.css'

interface Props {
  guessWord: string
  result: number
  alignment: number
}

export default function GuessMessage({ guessWord, result, alignment }: Props) {
  return (
    <>
      {alignment === 0 ? (
        <div className={styles.rightChild}>
          <text className={styles.resultText}>{result}</text>
          <text className={styles.rightText}>{guessWord} </text>
        </div>
      ) : (
        <div className={styles.leftChild}>
          <text className={styles.leftText}>{guessWord} </text>
          <text className={styles.resultText}>{result}</text>
        </div>
      )}
    </>
  )
}
