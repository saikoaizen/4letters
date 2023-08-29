import styles from './Title.module.css'

type Props = {
  isGamePage?: boolean
}

export default function Title({ isGamePage = false }: Props) {
  return (
    <h1 className={isGamePage ? styles.gameTitleText : styles.titleText}>
      4letters
    </h1>
  )
}
