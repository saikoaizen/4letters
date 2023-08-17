import React from 'react'
import styles from './MenuBox.module.css'

export default function MenuBox({ children }: { children: React.ReactNode }) {
  return <div className={styles.menuBox}>{children}</div>
}
