import React from 'react'
import styles from './GuessBox.module.css'

export default function GuessBox({ children }: { children: React.ReactNode }) {
  return <div className={styles.guessBox}>{children}</div>
}
