import styles from './GuessComponent.module.css'
import SecretWordInput from './SecretWordInput'

type Props = {
  active: boolean
  value: string
  onClick: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function GuessComponent({
  active,
  value,
  onClick,
  onChange,
}: Props) {
  return (
    <div className={styles.container}>
      <button
        className={active ? styles.pushable : styles.pushableOff}
        onClick={onClick}
      >
        <span className={active ? styles.front : styles.frontOff}>GUESS!</span>
      </button>
      <SecretWordInput
        placeholder="?"
        maxLength={4}
        value={value}
        gameMode={true}
        onChange={onChange}
        interactable={true}
        onSubmit={onClick}
      />
    </div>
  )
}
